import numpy as np

A = np.array([
    [1, 2, 3],
    [3, 2, 1],
    [2, 1, 2],
], dtype=float)

U, S, VT = np.linalg.svd(A)
S = np.diag(S)
print("U:", U)
print("S:", S)
print("V:", VT.T)
print("U @ S @ V.T:", U @ S @ VT)