from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import joblib
from sklearn.metrics import precision_score, recall_score, f1_score, accuracy_score
import os
from sklearn.model_selection import train_test_split



train_data_path = 'predicted_final.xlsx'
pipeline_path = 'nlp_classification_pipeline.pkl'

try:
    pipeline = joblib.load(pipeline_path)
except FileNotFoundError:
    raise Exception(f"No se encontró el archivo '{pipeline_path}'.")



app = FastAPI()

origins = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PredictionRequest(BaseModel):
    texts: list[str]

class RetrainingRequest(BaseModel):
    texts: list[str]
    labels: list[int]

@app.post("/predict")
def predict(request: PredictionRequest):
    if len(request.texts) == 0:
        raise HTTPException(status_code=400, detail="No se proporcionaron instancias para predecir.")
    
    texts_series = pd.Series(request.texts)

    predictions = pipeline.predict(texts_series)
    probabilities = pipeline.predict_proba(texts_series)

    response = []
    
    for prediction, probability in zip(predictions, probabilities):
        response.append({
            "prediction": int(prediction),
            "probability": probability
        })
    
    return {"predictions": predictions.tolist(),
            "probabilities": probabilities.tolist(),
            "classes": pipeline.classes_.tolist()}

@app.post("/retrain/completo")
def retrain(request: RetrainingRequest):
    if len(request.texts) == 0 or len(request.labels) == 0:
        raise HTTPException(status_code=400, detail="No se proporcionaron instancias para reentrenar.")
    if len(request.texts) != len(request.labels):
        raise HTTPException(status_code=400, detail="El número de textos y etiquetas no coincide.")
    
    new_data = pd.DataFrame({'Textos_espanol': request.texts, 'sdg': request.labels})

    existing_data = pd.read_excel(train_data_path)

    combined_data = pd.concat([existing_data, new_data], ignore_index=True)

    combined_data.to_excel(train_data_path, index=False)

    X = combined_data['Textos_espanol']
    y = combined_data['sdg']
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    pipeline.fit(X_train, y_train)

    predictions = pipeline.predict(X_test)
    precision = precision_score(y_test, predictions, average='weighted')
    recall = recall_score(y_test, predictions, average='weighted')
    f1 = f1_score(y_test, predictions, average='weighted')
    accuracy = accuracy_score(y_test, predictions)

    joblib.dump(pipeline, pipeline_path)

    return {
        "precision": round(precision, 2),
        "recall": round(recall, 2),
        "f1_score": round(f1, 2),
        "accuracy": round(accuracy, 2)
    }

@app.post("/retrain/independiente")
def retrain_independiente(request: RetrainingRequest):
    if len(request.texts) <= 1 or len(request.labels) <= 1:
        raise HTTPException(status_code=400, detail="No se proporcionaron suficientes instancias para reentrenar.")
    if len(request.texts) != len(request.labels):
        raise HTTPException(status_code=400, detail="El número de textos y etiquetas no coincide.")
    
    new_data = pd.DataFrame({'Textos_espanol': request.texts, 'sdg': request.labels})

    X = new_data['Textos_espanol']
    y = new_data['sdg']
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    pipeline.fit(X_train, y_train)

    predictions = pipeline.predict(X_test)
    precision = precision_score(y_test, predictions, average='weighted')
    recall = recall_score(y_test, predictions, average='weighted')
    f1 = f1_score(y_test, predictions, average='weighted')
    accuracy = accuracy_score(y_test, predictions)

   
    joblib.dump(pipeline, pipeline_path)

    return {
        "precision": round(precision, 2),
        "recall": round(recall, 2),
        "f1_score": round(f1, 2),
        "accuracy": round(accuracy, 2)
    }

@app.post("/retrain/parcial")
def retrain_parcial(request: RetrainingRequest):
    if len(request.texts) == 0 or len(request.labels) == 0:
        raise HTTPException(status_code=400, detail="No se proporcionaron instancias para reentrenar.")
    if len(request.texts) != len(request.labels):
        raise HTTPException(status_code=400, detail="El número de textos y etiquetas no coincide.")
    
    new_data = pd.DataFrame({'Textos_espanol': request.texts, 'sdg': request.labels})

    existing_data = pd.read_excel(train_data_path)

    historical_sample = existing_data.sample(frac=0.5, random_state=42)

    combined_data = pd.concat([historical_sample, new_data], ignore_index=True)

    X = combined_data['Textos_espanol']
    y = combined_data['sdg']
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    pipeline.fit(X_train, y_train)

    predictions = pipeline.predict(X_test)
    precision = precision_score(y_test, predictions, average='weighted')
    recall = recall_score(y_test, predictions, average='weighted')
    f1 = f1_score(y_test, predictions, average='weighted')
    accuracy = accuracy_score(y_test, predictions)

    joblib.dump(pipeline, pipeline_path)

    return {
        "precision": round(precision, 2),
        "recall": round(recall, 2),
        "f1_score": round(f1, 2),
        "accuracy": round(accuracy, 2)  
    }

import os

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=3001)
