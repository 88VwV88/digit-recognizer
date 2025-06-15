import os
import numpy as np
import tensorflow as tf


from tensorflow.keras.datasets import mnist
from tensorflow.keras.models import load_model
from tensorflow.keras.models import Sequential
from tensorflow.keras.utils import to_categorical
from tensorflow.keras.layers import Input, Dense, Conv2D, MaxPooling2D, Flatten, Dropout


def create_model():
    # Define the CNN model
    model = Sequential()

    # Input layer for 28x28 sized images
    model.add(Input(shape=(28, 28, 1)))
    # Convolutional layer 1
    # Filters: 32, Kernel size: 3x3, Activation: ReLU
    # Input shape: 28x28x1 (height, width, channels)
    model.add(Conv2D(32, (3, 3), activation="relu"))
    # Pooling layer 1
    # Max pooling with 2x2 pool size
    model.add(MaxPooling2D(2, 2))

    # Convolutional layer 2
    # Filters: 64, Kernel size: 3x3, Activation: ReLU
    model.add(Conv2D(64, (3, 3), activation="relu"))
    # Pooling layer 2
    # Max pooling with 2x2 pool size
    model.add(MaxPooling2D(2, 2))

    # Flatten the output from convolutional layers
    model.add(Flatten())

    # Dense layer 1 (Fully connected layer)
    # Units: 128, Activation: ReLU
    model.add(Dense(128, activation="relu"))
    # Dropout layer to prevent overfitting
    # Drops 50% of the neurons randomly during training
    model.add(Dropout(0.5))

    # Output layer
    # Units: 10 (for 10 classes, digits 0-9)
    # Activation: Softmax (outputs a probability distribution over the classes)
    model.add(Dense(10, activation="softmax"))

    model.compile(
        optimizer="adam", loss="categorical_crossentropy", metrics=["accuracy"]
    )

    print(model.summary())
    return model


if not os.path.lexists("./public/image_model.keras"):
    print(*tf.config.list_physical_devices("GPU"))

    (x_train, y_train), (x_test, y_test) = mnist.load_data()
    x_train, x_test = x_train / 255.0, x_test / 255.0

    x_train = (x_train > 0).astype(np.float32)
    x_test = (x_test > 0).astype(np.float32)

    y_train = to_categorical(y_train, num_classes=10)
    y_test = to_categorical(y_test, num_classes=10)

    print(x_train.shape, x_test.shape)

    model = create_model()
    print(model.summary())

    model.save("public/image_model.keras")
else:
    model = load_model("./public/image_model.keras")
    print(model.summary())
