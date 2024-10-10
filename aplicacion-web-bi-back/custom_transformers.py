from sklearn.base import BaseEstimator, TransformerMixin
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import SnowballStemmer

class TextPreprocessor(BaseEstimator, TransformerMixin):
    def __init__(self, conversiones, stopwords, stemmer):
        self.conversiones = conversiones
        self.stopwords = stopwords
        self.stemmer = stemmer

    def fit(self, X, y=None):
        return self

    def transform(self, X):
        def nlp_process(text):
            def recover(data):
                split = data.split(" ")
                new = []
                for x in split:
                    if "Ã" in x:
                        new.append(x.encode('latin1', errors='ignore').decode('utf-8', errors='ignore'))
                    else:
                        new.append(x)
                return " ".join(new).strip()

            def replace_(data):
                for key in self.conversiones:
                    data = data.replace(key, self.conversiones[key])
                return data.strip()

            def no_spaces(data):
                return [x.replace(" ", "") for x in data]

            def stopword_removal(data):
                return [x for x in data if x not in self.stopwords and "ã" not in x]

            def number_to_word(data):
                new = []
                for x in data:
                    if x.isnumeric():
                        new.append("num")
                    else:
                        new.append(x)
                return new

            def process_word(data):
                return [self.stemmer.stem(x) for x in data]

            def concact(data):
                return " ".join(data).strip()

            text = recover(text)
            text = text.lower()
            text = replace_(text)
            text = text.split() 
            text = no_spaces(text)
            text = stopword_removal(text)
            text = number_to_word(text)
            text = process_word(text)
            text = concact(text)
            return text

        return X.apply(nlp_process)
