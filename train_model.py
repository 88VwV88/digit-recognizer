import pandas
import os
import pickle
from sklearn.datasets import fetch_openml
from sklearn.model_selection import train_test_split
from sklearn.neural_network import MLPClassifier
from sklearn.metrics import classification_report


filename = "model.pickle"
# load a pretrained model if exits else train one
if os.path.exists(filename):
    with open(filename, "rb") as file:
        model = pickle.load(file)
    print("model loaded!")
else:
    # load the mnist_784 digit dataset from OpenML
    print("loading dataset...")
    digits = fetch_openml("mnist_784", as_frame=True)
    # seperate the label and target variables

    X, y = digits.drop(columns=["class"]), digits["class"]
    # construct the training and testing datasets
    X[X != 0] = 1 # scale the dataset to {0, 1}
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3)
    # create a Multi Layer Perceptron Classifier
    model = MLPClassifier(
        hidden_layer_sizes=(100, 100),
        max_iter=400,
        activation="relu",
        solver="adam",
        learning_rate="adaptive",
    )
    # fit the training data in the classifier
    print("traning classifier...")
    model.fit(X_train, y_train)

    # quantify the goodness of the fit
    print("Train score: %.3f" % model.score(X_train, y_train))
    # make predictions
    y_pred = model.predict(X_test)
    # check the test scores
    print(classification_report(y_test, y_pred))

    # save the trained model
    if not os.path.exists(filename):
        with open(filename, "wb") as file:
            pickle.dump(model, file)
    print("model saved!")
