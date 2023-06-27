import pandas as pd
import numpy as np

import sys
import ast

input = ast.literal_eval(sys.argv[1])
a=input['a']
b=input['b']
c=input['c']
d=input['d']
e=input['e']


df = pd.read_csv('USA_Housing.csv')


X = df[['Avg. Area Income', 'Avg. Area House Age', 'Avg. Area Number of Rooms',
       'Avg. Area Number of Bedrooms', 'Area Population']]
y = df['Price']


from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.4, random_state=101)
from sklearn.linear_model import LinearRegression
lm = LinearRegression()
lm.fit(X_train,y_train)
# a,b,c,d,e = 79545.458574,5.682861,7.009188,4.09,23086.800503
predictions = lm.predict(np.array([[a,b,c,d,e]]))


output = predictions[0]
print(output)

# sys.stdout.flush()