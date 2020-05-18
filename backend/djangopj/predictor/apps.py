from django.apps import AppConfig
from django.conf import settings
import tensorflow as tf
import tensorflow_hub as hub
import os


def macro_double_soft_f1(y, y_hat):
        y = tf.cast(y, tf.float32)
        y_hat = tf.cast(y_hat, tf.float32)
        tp = tf.reduce_sum(y_hat * y, axis=0)
        fp = tf.reduce_sum(y_hat * (1 - y), axis=0)
        fn = tf.reduce_sum((1 - y_hat) * y, axis=0)
        tn = tf.reduce_sum((1 - y_hat) * (1 - y), axis=0)
        soft_f1_class1 = 2*tp / (2*tp + fn + fp + 1e-16)
        soft_f1_class0 = 2*tn / (2*tn + fn + fp + 1e-16)
        # reduce 1 - soft-f1_class1 in order to increase soft-f1 on class 1
        cost_class1 = 1 - soft_f1_class1
        # reduce 1 - soft-f1_class0 in order to increase soft-f1 on class 0
        cost_class0 = 1 - soft_f1_class0
        # take into account both class 1 and class 0
        cost = 0.5 * (cost_class1 + cost_class0)
        macro_cost = tf.reduce_mean(cost)  # average on all labels
        return macro_cost

def macro_f1(y, y_hat, thresh=0.5):
    y_pred = tf.cast(tf.greater(y_hat, thresh), tf.float32)
    tp = tf.cast(tf.math.count_nonzero(y_pred * y, axis=0), tf.float32)
    fp = tf.cast(tf.math.count_nonzero(
        y_pred * (1 - y), axis=0), tf.float32)
    fn = tf.cast(tf.math.count_nonzero(
        (1 - y_pred) * y, axis=0), tf.float32)
    f1 = 2*tp / (2*tp + fn + fp + 1e-16)
    macro_f1 = tf.reduce_mean(f1)

    return macro_f1

class PredictorConfig(AppConfig):
    # name = 'predictor'

    path = os.path.join(settings.PICTURE_AGE_MODEL, 'layer2_1024_512.h5')
    picture_age_model = tf.keras.models.load_model(path, custom_objects={'KerasLayer': hub.KerasLayer,
                                                             'macro_double_soft_f1': macro_double_soft_f1,
                                                             'macro_f1': macro_f1})

    def _macro_double_soft_f1(self, y, y_hat):
        y = tf.cast(y, tf.float32)
        y_hat = tf.cast(y_hat, tf.float32)
        tp = tf.reduce_sum(y_hat * y, axis=0)
        fp = tf.reduce_sum(y_hat * (1 - y), axis=0)
        fn = tf.reduce_sum((1 - y_hat) * y, axis=0)
        tn = tf.reduce_sum((1 - y_hat) * (1 - y), axis=0)
        soft_f1_class1 = 2*tp / (2*tp + fn + fp + 1e-16)
        soft_f1_class0 = 2*tn / (2*tn + fn + fp + 1e-16)
        # reduce 1 - soft-f1_class1 in order to increase soft-f1 on class 1
        cost_class1 = 1 - soft_f1_class1
        # reduce 1 - soft-f1_class0 in order to increase soft-f1 on class 0
        cost_class0 = 1 - soft_f1_class0
        # take into account both class 1 and class 0
        cost = 0.5 * (cost_class1 + cost_class0)
        macro_cost = tf.reduce_mean(cost)  # average on all labels
        return macro_cost

    def _macro_f1(self, y, y_hat, thresh=0.5):
        y_pred = tf.cast(tf.greater(y_hat, thresh), tf.float32)
        tp = tf.cast(tf.math.count_nonzero(y_pred * y, axis=0), tf.float32)
        fp = tf.cast(tf.math.count_nonzero(
            y_pred * (1 - y), axis=0), tf.float32)
        fn = tf.cast(tf.math.count_nonzero(
            (1 - y_pred) * y, axis=0), tf.float32)
        f1 = 2*tp / (2*tp + fn + fp + 1e-16)
        macro_f1 = tf.reduce_mean(f1)

        return macro_f1
