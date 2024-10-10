import pandas as pd
import nltk
from custom_transformers import TextPreprocessor  
from nltk.corpus import stopwords
from nltk.stem import SnowballStemmer
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import joblib

try:
    nltk.data.find('corpora/stopwords')
except LookupError:
    nltk.download('stopwords')

train_data = 'ODScat_345.xlsx'
df_train = pd.read_excel(train_data)

X, y = df_train["Textos_espanol"], df_train["sdg"]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.1, random_state=0)

conversiones = {"á": "a", "é": "e", "í": "i", "ó": "o", "ú": "u", ", ": " ", ",": " ", "ñ": "n", "(": "", ")": "", '"': "", "”": "", "“": "", "®": "", "€": "", "º": "", "%": "", "¿": "", "?": " ", ".": " ", ":": " ", "/": " ", "-": " ", "www": "", "'": ""}
stps = set(stopwords.words("spanish"))
spanish_stemmer = SnowballStemmer('spanish')

pipeline = Pipeline([
    ('text_preprocessing', TextPreprocessor(conversiones=conversiones, stopwords=stps, stemmer=spanish_stemmer)),
    ('vectorization', TfidfVectorizer()),
    ('classifier', RandomForestClassifier(n_estimators=100, min_samples_split=10, min_samples_leaf=1, max_depth=None, bootstrap=False))
])

pipeline.fit(X_train, y_train)

score = pipeline.score(X_test, y_test)
print(f'Test set accuracy: {round(score, 2)}')

joblib.dump(pipeline, 'nlp_classification_pipeline.pkl')