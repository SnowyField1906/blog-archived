---
title: Singular Value Decomposition là gì và chi tiết cách tính
date: '2023-10-23'
tags: ['Machine Learning', 'Mathematics']
draft: false
summary: Giới thiệu về Singular Value Decomposition và các khái niệm liên quan, hướng dẫn chi tiết cách tính Singular Value Decomposition và triển khai bằng Python.
layout: PostView
thumbnail: '/static/images/thumbnails/singular-value-decomposition-la-gi-va-chi-tiet-cach-tinh.png'
---

_Các thuật toán decomposition (phân rã) cho ma trận là một trong những thuật toán quan trọng nhất trong Machine Learning nói chung và toán ứng dụng nói riêng. Những phép phân rã này không những giúp ta giảm độ phức tạp và chi phí khi thực hiện các phép tính với các ma trận lớn mà còn có những ứng dụng đặc biệt khác._

_Ở bài viết này, chúng ta sẽ cùng tìm hiểu về **Singular Value Decomposition** (Phân tích Suy biến) là gì và chi tiết cách tính._

<img className="w-full flex justify-center mx-auto" src="/static/images/thumbnails/singular-value-decomposition-la-gi-va-chi-tiet-cach-tinh.png" alt="Singular Value Decomposition là gì và chi tiết cách tính" />

## Khái niệm

**Singular Value Decomposition** (Phân tích Suy biến) là một phương pháp phân rã một ma trận bất kì thành tích của ba ma trận $\mathbf{U}$, $\mathbf{\Sigma}$ và $\mathbf{V}^T$, trong đó $\mathbf{U}$ và $\mathbf{V}$ là các **Orthonormal Matrix** (Ma trận Trực chuẩn) và $\mathbf{\Sigma}$ là một **Diagonal Matrix** (Ma trận Đường chéo).

## Nhắc lại

### Ma trận

**Ma trận** là một tập hợp các **unit vector** (vector đơn vị) được sắp xếp theo hàng hoặc cột. Một ma trận $\mathbf{A} \in \mathbb{R}^{m \times n}$ có thể được biểu diễn như sau:

$$
\begin{align*}
\mathbf{A} &= \begin{bmatrix} \mathbf{a}_1 & \mathbf{a}_2 & \dots & \mathbf{a}_n \end{bmatrix} \\
&= \begin{bmatrix} \mathbf{a}_{11} & \mathbf{a}_{12} & \dots & \mathbf{a}_{1n} \\ \mathbf{a}_{21} & \mathbf{a}_{22} & \dots & \mathbf{a}_{2n} \\ \vdots & \vdots & \ddots & \vdots \\ \mathbf{a}_{m1} & \mathbf{a}_{m2} & \dots & \mathbf{a}_{mn} \end{bmatrix} \\
\end{align*} \tag{1}
$$

Các unit vector đóng vai trò định nghĩa lại một không gian mới bằng tổ hợp tuyến tính của chúng. Ví dụ như không gian 3 chiều cơ bản được định nghĩa bởi 3 unit vector $i = (1, 0, 0)$, $j = (0, 1, 0)$ và $k = (0, 0, 1)$:

$$
\begin{align*}
R^3 &= \begin{bmatrix} i & j & k \end{bmatrix} \\
&= \begin{bmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{bmatrix} \\
\end{align*}
$$

Ý nghĩa hình học của ma trận là nó biểu diễn một phép biến đổi tuyến tính, hay nói cách khác nó giống như một phép biến đổi một không gian này sang một không gian khác mà phép biến đổi này có thể là tổ hợp của các phép **rotate** (quay), **stretch** (co giãn), **trượt** (shear),...

Ma trận $\mathbf{A} \in \mathbb{R}^{m \times n}$ biểu diễn một phép biến đổi từ không gian $\mathbb{R}^n$ sang không gian $\mathbb{R}^m$.

### Linearly Dependent và Linearly Independent

#### Linearly Dependent

Một tập hợp các vector $\mathbf{v}_1, \mathbf{v}_2, \dots, \mathbf{v}_n$ được gọi là **Linearly Dependent** (Phụ thuộc Tuyến tính) nếu tồn tại nghiệm là một tập hợp các hệ số $c_1, c_2, \dots, c_n$ không đồng thời bằng $0$ sao cho:

$$
\begin{align*}
c_1 \mathbf{v}_1 + c_2 \mathbf{v}_2 + \dots + c_n \mathbf{v}_n = 0
\end{align*}\tag{2}
$$

Điều này có nghĩa là một trong các hệ số phải khác $0$, giả sử nếu $c_1 \neq 0$ thì:

$$
\begin{align*}
\begin{cases}
\mathbf{v}_1 = -\frac{c_2}{c_1} \mathbf{v}_2 - \dots - \frac{c_n}{c_1} \mathbf{v}_n &\text{khi} \enspace n > 1 \\
\mathbf{v}_1 = 0 &
\text{khi} \enspace n = 1 \\
\end{cases} \tag{3}
\end{align*}
$$

Lúc này, ta có thể thấy $\mathbf{v}_1$ đã không tạo ra một chiều không gian mới mà nó chỉ nằm trong không gian của các vector khác. Nói cách khác, $\mathbf{v}_1$ đã phụ thuộc tuyến tính vào các vector còn lại.

#### Linearly Independent

Ngược lại với linear dependence, một tập hợp các vector $\mathbf{v}_1, \mathbf{v}_2, \dots, \mathbf{v}_n$ được gọi là **Linearly Independent** (Độc lập Tuyến tính) nếu phương trình (2) chỉ có một nghiệm duy nhất là $c_1 = c_2 = \dots = c_n = 0$.

Vì lúc này các vector đều độc lập tuyến tính với nhau và phương trình chỉ bằng $0$ khi và chỉ khi tất cả các hệ số đều đồng thời bằng $0$.

### Determinant và Singular Matrix

#### Determinant

**Determinant** (Định thức) của một ma trận vuông $\mathbf{A} \in \mathbb{R}^{n \times n}$ thể hiện **độ lệch** của không gian sau khi biến đổi bởi ma trận $\mathbf{A}$ so với không gian ban đầu.

Với không gian 3 chiều, ta sẽ tính thể tích được bao bởi 3 unit vector $i = (1, 0, 0)$, $j = (0, 1, 0)$ và $k = (0, 0, 1)$, khi đó thể tích sẽ là $1 \times 1 \times 1 = 1$. Điều này nói lên rằng không gian được tạo nên bởi các khối lập phương với thể tích bằng $1$.

Khi một ma trận $3 \times 3$ biến đổi không gian 3 chiều, nó sẽ biến đổi đơn vị thể tích từ $1$ thành $\det(\mathbf{A})$. Hay không gian này lớn hơn không gian ban đầu $\det(\mathbf{A})$ lần.

Nếu ma trận trên có determinant bằng $0$ thì không gian mới sẽ có thể tích bằng $0$, có nghĩa là nó có thể là một dấu chấm (OD), một đường thẳng (1D) hay một mặt phẳng (2D).

Tổng quát hơn, nếu:

- $\det(\mathbf{A}) > 0$: Không gian mới sẽ có cùng hướng với không gian ban đầu.
- $\det(\mathbf{A}) < 0$: Không gian mới sẽ có hướng ngược với không gian ban đầu.
- $\det(\mathbf{A}) = 0$: Không gian mới sẽ có chiều thấp hơn không gian ban đầu.

#### Singular Matrix

Một **Singular Matrix** (Ma trận Suy biến) là một ma trận vuông $\mathbf{A}$ có determinant bằng $0$, tức là $\det(\mathbf{A}) = 0$.

Ý nghĩa hình học của singular matrix là nó suy biến một không gian thành một không gian khác có chiều thấp hơn.

### Orthogonal Matrix và Orthonormal Matrix

#### Orthogonal Matrix

Hai vector $\mathbf{u}$ và $\mathbf{v}$ được gọi là **Orthogonal** (Trực giao) khi và chỉ khi chúng vuông góc với nhau, tức là $\mathbf{u}^T \mathbf{v} = 0$.

Một **Orthogonal Matrix** (Ma Trận Trực giao) là một tập hợp các vector mà mọi cặp unit vector trong đó đều orthogonal với nhau.

Gọi $\mathbf{A}$ là một orthogonal matrix khi đó:

$$
\begin{align*}
\mathbf{A}^T \mathbf{A} = \mathbf{I} = \mathbf{A} \mathbf{A}^T \implies \mathbf{A}^{-1} = \mathbf{A}^T \tag{4}
\end{align*}
$$

#### Orthonormal Matrix

Hai vector $\mathbf{u}$ và $\mathbf{v}$ được gọi là **Orthonormal** (Trực chuẩn) khi và chỉ khi chúng là orthogonal và đồng thời có độ dài bằng $1$, tức là $\mathbf{u}^T \mathbf{v} = 0$ và $||\mathbf{u}|| = ||\mathbf{v}|| = 1$.

Một **Orthonormal Matrix** (Ma trận Trực chuẩn) là một trường hợp đặc biệt của orthogonal matrix khi nó bị ràng buộc bởi điều kiện rằng mọi unit vector trong đó đều có độ dài bằng $1$.

Vì các tính chất trên, nếu $\mathbf{A}$ là một orthonormal matrix thì nó sẽ thỏa mãn toàn bộ tính chất của một orthogonal matrix và $\det(\mathbf{A}) = 1$.

### Eigenvector và Eigenvalue

#### Eigenvector

**Eigenvector** (Vector riêng) của một ma trận vuông $\mathbf{A}$ là một vector $\mathbf{v}$ khác không thỏa mãn:

$$
\begin{align*}
\mathbf{A} \mathbf{v} = \lambda \mathbf{v} \tag{5}
\end{align*}
$$

Thông thường, sau khi biển đổi không gian bằng một ma trận, các **điểm và vector** sẽ bị lệch ra khỏi hướng hiện tại (tỉ lệ giữa các chiều trước và sau sẽ bị thay đổi). Trừ khi chúng nằm trên các eigenvector.

Ý nghĩa hình học của eigenvector là tìm ra các vector sao cho sau khi biến đổi một không gian bằng ma trận $\mathbf{A}$, toàn bộ các **điểm hoặc vector** nằm trên giá của các eigenvector này sẽ chỉ **trượt hoặc kéo dãn** theo hướng của các eigenvector đó theo hệ số $\lambda$.

Hệ quả là eigenvector có thể giúp mô phỏng lại được phép biến đổi của ma trận $\mathbf{A}$ thông qua các vector và eigenvalue của nó. Điều này có thể gây nhầm lẫn với unit vector, nên nhớ rằng unit vector chỉ biểu diễn chiều không gian mới, còn eigenvector biểu diễn quá trình biển đổi không gian.

Do đó nó sẽ không thể mô phỏng được phép biến đổi **rotate** (quay) vì lúc này toàn bộ vector đều bị lệch ra khỏi hướng hiện tại. Tuy nhiên các ma trận xoay vẫn có các eigenvector và eigenvalue tương ứng, và chúng sẽ là các **nghiệm phức** thay vì **nghiệm thực**.

#### Eigenvalue

**Eigenvalue** (Trị riêng) của một ma trận vuông $\mathbf{A}$ là một số $\lambda$ sao cho tồn tại một vector $\mathbf{v}$ khác không thỏa mãn phương trình $(5)$.

Mỗi eigenvalue tương ứng với một eigenvector. Số cặp nghiệm $(\lambda, \mathbf{v})$ thường sẽ bằng số chiều của ma trận $\mathbf{A}$ vì mỗi eigenvector sẽ biểu diễn cách biến đổi một chiều không gian tương ứng.

Nếu $\lambda$ âm thì đồng nghĩa với việc không gian đã đã bị nén và lật ngược lại. Eigenvalue thể hiện độ dài của eigenvector tương ứng và cho biết không gian đã co giãn như thế nào.

#### Ý tưởng

Quay lại $(5)$, ta có:

$$
\begin{align*}
\mathbf{A} \mathbf{v} &= \lambda \mathbf{v} \\
\implies \mathbf{A} \mathbf{v} - \lambda \mathbf{v} &= 0 \\
\implies (\mathbf{A} - \lambda \mathbf{I}) \mathbf{v} &= 0 \tag{6}
\end{align*}
$$

Lúc này bài toán trở thành tìm ma trận $\mathbf{C} = \mathbf{A} - \lambda \mathbf{I}$ sao cho vector ban đầu $\mathbf{v} \neq 0$ sẽ bị biến đổi về vector không.

Do đó, ma trận $\mathbf{C}$ phải là một singular mtrix, suy biến một không gian về một không gian có chiều thấp hơn. Để có được điều này, ta chỉ cần đưa định determinant của $\mathbf{C}$ về 0:

$$
\begin{align*}
\det(\mathbf{C}) = 0 \\
\implies \det(\mathbf{A} - \lambda \mathbf{I}) = 0 \\
\implies \begin{vmatrix} \mathbf{a}_{11} - \lambda & \mathbf{a}_{12} & \dots & \mathbf{a}_{1n} \\ \mathbf{a}_{21} & \mathbf{a}_{22} - \lambda & \dots & \mathbf{a}_{2n} \\ \vdots & \vdots & \ddots & \vdots \\ \mathbf{a}_{n1} & \mathbf{a}_{n2} & \dots & \mathbf{a}_{nn} - \lambda \end{vmatrix} = 0 \tag{7}
\end{align*}
$$

Phương trình $(7)$ còn được gọi được gọi là **Characteristic Polynomial** (Phương trình Đặc trưng) của ma trận $\mathbf{A}$.

Sau khi tìm được các giá trị $\lambda$ thỏa mãn phương trình $(7)$, ta sẽ có được các eigenvector tương ứng với mỗi giá trị $\lambda$ bằng cách giải hệ phương trình $(6)$.

## Cách tính

Cho trước ma trận linearly independent $\mathbf{A} \in \mathbb{R}^{m \times n}$ có các unit vector $\mathbf{a}_1, \mathbf{a}_2, \dots, \mathbf{a}_n$:

$$
\begin{align*}
\mathbf{A} &= \begin{bmatrix} \mathbf{a}_1 & \mathbf{a}_2 & \dots & \mathbf{a}_n \end{bmatrix} \\
&= \begin{bmatrix} \mathbf{a}_{11} & \mathbf{a}_{12} & \dots & \mathbf{a}_{1n} \\ \mathbf{a}_{21} & \mathbf{a}_{22} & \dots & \mathbf{a}_{2n} \\ \vdots & \vdots & \ddots & \vdots \\ \mathbf{a}_{m1} & \mathbf{a}_{m2} & \dots & \mathbf{a}_{mn} \end{bmatrix} \\
\end{align*}
$$

### Bước 1: Tìm ma trận $\mathbf{V}$

Cho ma trận $\mathbf{V}$ được tạo thành bởi các eigenvector của ma trận $\mathbf{B} = \mathbf{A}^T\mathbf{A}$, do đó, ta cần tìm các eigenvector và eigenvalue thỏa mãn phương trình:

$$
\begin{align*}
\mathbf{A}^T\mathbf{A} \mathbf{v} &= \lambda \mathbf{v} \\
\implies (\mathbf{A}^T\mathbf{A} - \lambda \mathbf{I}) \mathbf{v} &= 0 \\
\implies \begin{vmatrix} \mathbf{b}_{11} - \lambda & \mathbf{b}_{12} & \dots & \mathbf{b}_{1n} \\ \mathbf{b}_{21} & \mathbf{b}_{22} - \lambda & \dots & \mathbf{b}_{2n} \\ \vdots & \vdots & \ddots & \vdots \\ \mathbf{b}_{n1} & \mathbf{b}_{n2} & \dots & \mathbf{b}_{nn} - \lambda \end{vmatrix} &= 0 \tag{8}
\end{align*}
$$

Sau khi có được tập nghiệm $\Lambda = \{\lambda_1, \lambda_2, \dots, \lambda_n\}$ thỏa mãn phương trình $(8)$, ta sẽ sắp xếp chúng theo thứ tự giảm dần.

Lúc này, ta sẽ tìm đươc các eigenvector $\mathbf{V} = \{\mathbf{v}_1, \mathbf{v}_2, \dots, \mathbf{v}_n\}$ trong đó mỗi eigenvector $\mathbf{v}_i$ sẽ tương ứng với một eigenvalue $\lambda_i$.

Để tìm $\mathbf{v}_i$, đặt $\mathbf{C} = \mathbf{A}^T\mathbf{A} - \lambda_i \mathbf{I}$ và $\mathbf{v} = \mathbf{v}_i$, ta sẽ giải hệ phương trình $(6)$:

$$
\begin{align*}
(\mathbf{A}^T\mathbf{A} - \lambda \mathbf{I}) \mathbf{v} = 0 \\
\implies \mathbf{C} \mathbf{v} = 0 \\
\implies \begin{cases} \mathbf{c}_{11} v_1 + \mathbf{c}_{12} v_2 + \dots + \mathbf{c}_{1n} v_n &= 0 \\ \mathbf{c}_{21} v_1 + \mathbf{c}_{22} v_2 + \dots + \mathbf{c}_{2n} v_n &= 0 \\ \vdots \\ \mathbf{c}_{n1} v_1 + \mathbf{c}_{n2} v_2 + \dots + \mathbf{c}_{nn} v_n &= 0 \end{cases} \tag{9}
\end{align*}
$$

Có $\mathbf{v} = (v_1, v_2, \dots, v_n)$, ta sẽ normalize (chuẩn hóa) để độ dài của vector bằng $1$:

$$
\begin{align*}
\mathbf{v} &= \frac{\mathbf{v}}{||\mathbf{v}||} \\
&= \frac{1}{\sqrt{v_1^2 + v_2^2 + \dots + v_n^2}} \mathbf{v}\\
\end{align*} \tag{10}
$$

Ta được ma trận $\mathbf{V}$:

$$
\begin{align*}
\mathbf{V} &= \begin{bmatrix} \mathbf{v}_1 & \mathbf{v}_2 & \dots & \mathbf{v}_n \end{bmatrix} \\
&= \begin{bmatrix} \mathbf{v}_{11} & \mathbf{v}_{12} & \dots & \mathbf{v}_{1n} \\ \mathbf{v}_{21} & \mathbf{v}_{22} & \dots & \mathbf{v}_{2n} \\ \vdots & \vdots & \ddots & \vdots \\ \mathbf{v}_{n1} & \mathbf{v}_{n2} & \dots & \mathbf{v}_{nn} \end{bmatrix} \\
\end{align*}
$$

### Bước 2: Tìm ma trận $\mathbf{\Sigma}$

Cho ma trận $\mathbf{\Sigma}$ là một ma trận đường chéo với các phần tử trên đường chéo chính là căn bậc hai của các eigenvalue của ma trận $\mathbf{B} = \mathbf{A}^T\mathbf{A}$:

$$
\begin{align*}
\mathbf{\sigma}_{ij} &= \begin{cases} \sqrt{\lambda_j} &\text{khi} \enspace i = j \\ 0 &\text{khi} \enspace i \neq j \end{cases} \tag{11}
\end{align*}
$$

Ta được ma trận $\mathbf{\Sigma}$:

$$
\begin{align*}
\mathbf{\Sigma} &= \begin{bmatrix} \sigma_{11} & 0 & \dots & 0 \\ 0 & \sigma_{22} & \dots & 0 \\ \vdots & \vdots & \ddots & \vdots \\ 0 & 0 & \dots & \sigma_{nn} \end{bmatrix} \\
&= \begin{bmatrix} \sqrt{\lambda_1} & 0 & \dots & 0 \\ 0 & \sqrt{\lambda_2} & \dots & 0 \\ \vdots & \vdots & \ddots & \vdots \\ 0 & 0 & \dots & \sqrt{\lambda_n} \end{bmatrix} \\
\end{align*}
$$

### Bước 3: Tìm ma trận $\mathbf{U}$

Chúng ta có thể tìm ma trận $\mathbf{U}$ bằng cách làm tương tự như tìm ma trận $\mathbf{V}$, chỉ khác là ta sẽ tìm các eigenvector của ma trận $\mathbf{B}' = \mathbf{A}\mathbf{A}^T$ thay vì $\mathbf{A}^T\mathbf{A}$.

Ngoài ra, ta cũng có thể tìm ma trận $\mathbf{U}$ bằng cách nhân ma trận $\mathbf{A}$ với $\mathbf{V}$ và nghịch đảo của $\mathbf{\Sigma}^{-1}$.

Chứng minh:

$$
\begin{align*}
\mathbf{A} &= \mathbf{U} \mathbf{\Sigma} \mathbf{V}^T \\
\implies \mathbf{A} \mathbf{V} &= \mathbf{U} \mathbf{\Sigma} \mathbf{V}^T \mathbf{V} \\
\implies \mathbf{A} \mathbf{V} &= \mathbf{U} \mathbf{\Sigma} \mathbf{I} \tag*{xem lại (4)} \\
\implies \mathbf{A} \mathbf{V} &= \mathbf{U} \mathbf{\Sigma} \\
\implies \mathbf{A} \mathbf{V} \mathbf{\Sigma}^{-1} &= \mathbf{U} \mathbf{\Sigma} \mathbf{\Sigma}^{-1} \\
\implies \mathbf{A} \mathbf{V} \mathbf{\Sigma}^{-1} &= \mathbf{U} \mathbf{I} \\
\implies \mathbf{U} &= \mathbf{A} \mathbf{V} \mathbf{\Sigma}^{-1}
\end{align*}\tag{12}
$$

Nếu ma trận $\mathbf{A}$ không vuông, ta sẽ phải thay $\mathbf{\Sigma}^{-1}$ bằng pseudo-inverse $\mathbf{\Sigma}^\dagger = \mathbf{\Sigma}^T (\mathbf{\Sigma} \mathbf{\Sigma}^T)^{-1}$.

## Ví dụ

Hãy thực hiện Singular Value Decomposition cho ma trận $\mathbf{A}$ được tạo bởi 3 vector $\mathbf{a}_1$, $\mathbf{a}_2$ và $\mathbf{a}_3$ như sau:

$$
\begin{align*}
\mathbf{a}_1 &= (1, 3, 2) \\
\mathbf{a}_2 &= (2, 2, 1) \\
\mathbf{a}_3 &= (3, 1, 2) \\
\end{align*} \tag{13}
$$

- Ta có ma trận $\mathbf{A}$:

$$
\begin{align*}
\mathbf{A} &= \begin{bmatrix} \mathbf{a}_1 & \mathbf{a}_2 & \mathbf{a}_3 \end{bmatrix} \\
&= \begin{bmatrix} 1 & 2 & 3 \\ 3 & 2 & 1 \\ 2 & 1 & 2 \end{bmatrix} \\
\end{align*} \tag{14}
$$

- Ta có ma trận $\mathbf{B} = \mathbf{A}^T\mathbf{A}$:

$$
\begin{align*}
\mathbf{B} &= \mathbf{A}^T\mathbf{A} \\
&= \begin{bmatrix} 1 & 3 & 2 \\ 2 & 2 & 1 \\ 3 & 1 & 2 \end{bmatrix} \begin{bmatrix} 1 & 2 & 3 \\ 3 & 2 & 1 \\ 2 & 1 & 2 \end{bmatrix} \\
&= \begin{bmatrix} 14 & 10 & 10 \\ 10 & 9 & 10 \\ 10 & 10 & 14 \end{bmatrix} \\
\end{align*} \tag{15}
$$

- Giải characteristic polynomial của ma trận $\mathbf{B}$:

$$
\begin{align*}
\det(\mathbf{B} - \lambda \mathbf{I}) &= 0 \\
\begin{vmatrix} 14 - \lambda & 10 & 10 \\ 10 & 9 - \lambda & 10 \\ 10 & 10 & 14 - \lambda \end{vmatrix} &= 0 \\
\implies (14 - \lambda) \begin{vmatrix} 9 - \lambda & 10 \\ 10 & 14 - \lambda \end{vmatrix} - 10 \begin{vmatrix} 10 & 10 \\ 10 & 14 - \lambda \end{vmatrix} + 10 \begin{vmatrix} 10 & 9 - \lambda \\ 10 & 10 \end{vmatrix} &= 0 \\
\implies (14 - \lambda) \left[ (9 - \lambda)(14 - \lambda) - 100 \right] - 10 \left[ 10(14 - \lambda) - 100 \right] + 10 \left[ 100 - 10(9 - \lambda) \right] &= 0 \\
\implies (14 - \lambda) \left[ 26 - 23\lambda + \lambda^2 \right] - 10 \left[ 40 - 10\lambda \right] + 10 \left[ 10 + 10\lambda \right] &= 0 \\
\implies (14 - \lambda) \left[ 26 - 23\lambda + \lambda^2 \right] - 10(30 - 20 \lambda) &= 0 \\
\implies (364 - 348\lambda + 37\lambda^2 - \lambda^3) - (300 - 200\lambda) &= 0 \\
\implies 64 - 148\lambda + 37\lambda^2 - \lambda^3 &= 0
\end{align*} \tag{16}
$$

- Giải phương trình bậc 3 $(15)$, ta được tập nghiệm $\Lambda = \{\lambda_1, \lambda_2, \lambda_3\}$:

$$
\begin{align*}
\lambda_1 &= 32.50781059 \\
\lambda_2 &= 4 \\
\lambda_3 &= 0.49218941 \\
\end{align*} \tag{17}
$$

- Tìm eigenvector $\mathbf{v}_1$ bằng $\lambda_1$:

$$
\begin{align*}
\mathbf{C} \mathbf{v} &= 0 \\
\implies \begin{bmatrix} 14 - \lambda & 10 & 10 \\ 10 & 9 - \lambda & 10 \\ 10 & 10 & 14 - \lambda \end{bmatrix} \begin{bmatrix} v_{1} \\ v_{2} \\ v_{3} \end{bmatrix} &= 0 \\
\implies \begin{bmatrix} -18.50781059 & 10 & 10 \\ 10 & -23.50781059 & 10 \\ 10 & 10 & -18.50781059 \end{bmatrix} \begin{bmatrix} v_{1} \\ v_{2} \\ v_{3} \end{bmatrix} &= 0 \\
\implies \begin{cases} -18.50781059 v_{1} + 10 v_{2} + 10 v_{3} &= 0 \\ 10 v_{1} - 23.50781059 v_{2} + 10 v_{3} &= 0 \\ 10 v_{1} + 10 v_{2} - 18.50781059 v_{3} &= 0 \end{cases} \\
\implies \begin{cases} v_{1} &= a \\ v_{2} &=
0,85078106 a \\ v_{3} &= a \end{cases} \enspace \text{với} \enspace a \in \mathbb{R}
\end{align*} \tag{18}
$$

- Đặt $a = 1$, ta được eigenvector $\mathbf{v}_1 = (1, 0.85078106, 1)$, sau đó ta thực hiện chuẩn hóa:

$$
\begin{align*}
\mathbf{v}_1 &= \frac{\mathbf{v}_1}{||\mathbf{v}_1||} \\
&= \frac{1}{\sqrt{1^2 + 0.85078106^2 + 1^2}} (1, 0.85078106, 1)\\
&= (0.6059128, 0.51549913, 0.6059128) \\
\end{align*} \tag{19}
$$

- Tìm eigenvector $\mathbf{v}_2$ bằng $\lambda_2$:

$$
\begin{align*}
\mathbf{C} \mathbf{v} &= 0 \\
\implies \begin{bmatrix} 14 - \lambda & 10 & 10 \\ 10 & 9 - \lambda & 10 \\ 10 & 10 & 14 - \lambda \end{bmatrix} \begin{bmatrix} v_{1} \\ v_{2} \\ v_{3} \end{bmatrix} &= 0 \\
\implies \begin{bmatrix} 10 & 10 & 10 \\ 10 & 5 & 10 \\ 10 & 10 & 10 \end{bmatrix} \begin{bmatrix} v_{1} \\ v_{2} \\ v_{3} \end{bmatrix} &= 0 \\
\implies \begin{cases} 10 v_{1} + 10 v_{2} + 10 v_{3} &= 0 \\ 10 v_{1} + 5 v_{2} + 10 v_{3} &= 0 \\ 10 v_{1} + 10 v_{2} + 10 v_{3} &= 0 \end{cases} \\
\implies \begin{cases} v_{1} &= -a \\ v_{2} &= 0 \\ v_{3} &= a \end{cases} \enspace \text{với} \enspace a \in \mathbb{R}
\end{align*} \tag{20}
$$

- Đặt $a = 1$, ta được eigenvector $\mathbf{v}_2 = (-1, 0, 1)$, sau đó ta thực hiện chuẩn hóa:

$$
\begin{align*}
\mathbf{v}_2 &= \frac{\mathbf{v}_2}{||\mathbf{v}_2||} \\
&= \frac{1}{\sqrt{(-1)^2 + 0^2 + 1^2}} (-1, 0, 1)\\
&= (-0.70710678, 0, 0.70710678) \\
\end{align*} \tag{21}
$$

- Tìm eigenvector $\mathbf{v}_3$ bằng $\lambda_3$:

$$
\begin{align*}
\mathbf{C} \mathbf{v} &= 0 \\
\implies \begin{bmatrix} 14 - \lambda & 10 & 10 \\ 10 & 9 - \lambda & 10 \\ 10 & 10 & 14 - \lambda \end{bmatrix} \begin{bmatrix} v_{1} \\ v_{2} \\ v_{3} \end{bmatrix} &= 0 \\
\implies \begin{bmatrix} 13.50781059 & 10 & 10 \\ 10 & 8.50781059 & 10 \\ 10 & 10 & 13.50781059 \end{bmatrix} \begin{bmatrix} v_{1} \\ v_{2} \\ v_{3} \end{bmatrix} &= 0 \\
\implies \begin{cases} 13.50781059 v_{1} + 10 v_{2} + 10 v_{3} &= 0 \\ 10 v_{1} + 8.50781059 v_{2} + 10 v_{3} &= 0 \\ 10 v_{1} + 10 v_{2} + 13.50781059 v_{3} &= 0 \end{cases} \\
\implies \begin{cases} v_{1} &= a \\ v_{2} &= -2.35078106 a \\ v_{3} &= a \end{cases} \enspace \text{với} \enspace a \in \mathbb{R}
\end{align*}\tag{22}
$$

- Đặt $a = 1$, ta được eigenvector $\mathbf{v}_3 = (1, -2.35078106, 1)$, sau đó ta thực hiện chuẩn hóa:

$$
\begin{align*}
\mathbf{v}_3 &= \frac{\mathbf{v}_3}{||\mathbf{v}_3||} \\
&= \frac{1}{\sqrt{1^2 + (-2.35078106)^2 + 1^2}} (1, -2.35078106, 1)\\
&= (0.36451293, -0.8568901, 0.36451293) \\
\end{align*} \tag{23}
$$

- Ta có ma trận $\mathbf{V}$:

$$
\begin{align*}
\mathbf{V} &= \begin{bmatrix} \mathbf{v}_1 & \mathbf{v}_2 & \mathbf{v}_3 \end{bmatrix} \\
&= \begin{bmatrix} 0.6059128 & -0.70710678 & 0.36451293 \\ 0.51549913 & 0 & -0.8568901 \\ 0.6059128 & 0.70710678 & 0.36451293 \end{bmatrix} \\
\end{align*}
$$

- Ta có ma trận $\mathbf{\Sigma}$:

$$
\begin{align*}
\mathbf{\Sigma} &= \begin{bmatrix} \sqrt{\lambda_1} & 0 & 0 \\ 0 & \sqrt{\lambda_2} & 0 \\ 0 & 0 & \sqrt{\lambda_3} \end{bmatrix} \\
&= \begin{bmatrix} 5.70156212 & 0 & 0 \\ 0 & 2 & 0 \\ 0 & 0 & 0.70156212 \end{bmatrix} \\
\end{align*} \tag{24}
$$

- Ta có ma trận $\mathbf{U}$:

$$
\begin{align*}
\mathbf{U} &= \mathbf{A} \mathbf{V} \mathbf{\Sigma}^{-1} \\
&= \begin{bmatrix} 1 & 2 & 3 \\ 3 & 2 & 1 \\ 2 & 1 & 2 \end{bmatrix} \begin{bmatrix} 0.6059128 & -0.70710678 & 0.36451293 \\ 0.51549913 & 0 & -0.8568901 \\ 0.6059128 & 0.70710678 & 0.36451293 \end{bmatrix} \begin{bmatrix} 0.17539053 & 0 & 0 \\ 0 & 0.5 & 0 \\ 0 & 0 & 1.42539053 \end{bmatrix} \\
&= \begin{bmatrix}
3.45464947 & 1.41421356 & -0.25572847 \\
3.45464947 & -1.41421356 & -0.25572847 \\
2.93915033 & 0 & 0.60116163
\end{bmatrix} \begin{bmatrix} 0.17539053 & 0 & 0 \\ 0 & 0.5 & 0 \\ 0 & 0 & 1.4253905 \end{bmatrix} \\
&= \begin{bmatrix}
0.6059128 & 0.70710678 & -0.36451293 \\
0.6059128 & -0.70710678 & -0.36451293 \\
0.51549913 & 0 & 0.8568901
\end{bmatrix} \\
\end{align*} \tag{25}
$$

- Như vậy, ta đã tìm được ma trận $\mathbf{U}$, $\mathbf{\Sigma}$ và $\mathbf{V}$ thỏa mãn:

$$
\begin{align*}
\mathbf{A} &= \mathbf{U} \mathbf{\Sigma} \mathbf{V}^T \\
\implies \begin{bmatrix} 1 & 2 & 3 \\ 3 & 2 & 1 \\ 2 & 1 & 2 \end{bmatrix} &= \begin{bmatrix}
0.6059128 & 0.70710678 & -0.36451293 \\
0.6059128 & -0.70710678 & -0.36451293 \\
0.51549913 & 0 & 0.8568901
\end{bmatrix} \begin{bmatrix} 5.70156212 & 0 & 0 \\ 0 & 2 & 0 \\ 0 & 0 & 0.70156212 \end{bmatrix} \begin{bmatrix} 0.6059128 & 0.51549913 & 0.6059128 \\ -0.70710678 & 0 & 0.70710678 \\ 0.36451293 & -0.8568901 & 0.36451293 \end{bmatrix} \\
\end{align*} \tag{26}
$$

> Kiểm tra phép tính tại đây: [Matrix Calculator](https://matrixcalc.org/#%7B%7B172732473/285078106,35355339/50000000,-913316/2505579%7D,%7B172732473/285078106,-35355339/50000000,-913316/2505579%7D,%7B293915033/570156212,0,30058081/35078106%7D%7D*%7B%7B5%2e70156212,0,0%7D,%7B0,2,0%7D,%7B0,0,0%2e70156212%7D%7D) và [Matrix Calculator](https://matrixcalc.org/#%7B%7B172732473/50000000,35355339/25000000,-1598303/6250000%7D,%7B172732473/50000000,-35355339/25000000,-1598303/6250000%7D,%7B293915033/100000000,0,30058081/50000000%7D%7D*%7B%7B0%2e6059128,0%2e51549913,0%2e6059128%7D,%7B-0%2e70710678,0,0%2e70710678%7D,%7B0%2e36451293,-0%2e8568901,0%2e36451293%7D%7D)

## Triển khai code Python

Toàn bộ code có thể xem chi tiết tại: [snowyfield1906/ai-general-research/least_squares
/least_squares.py](https://github.com/SnowyField1906/ai-general-research/blob/main/least_squares/least_squares.py).

### Thuật toán chính

```python
def singular_value_decomposition(A: np.array) -> (np.array, np.array, np.array):
    m, n = A.shape

    # Setup V
    projection_A = A.T @ A
    eigen = np.linalg.eig(projection_A)
    values, vectors = sort_eigen_by_values(eigen)
    V = vectors

    # Setup Σ
    S = np.zeros((m, n), float)
    for i in range(min(m, n)):
        S[i][i] = values[i] ** 0.5

    # Setup U
    pseudo_inverse_S = pseudo_inverse(S)
    U = A @ V @ pseudo_inverse_S

    return U, S, V
```

> Vì lười code phần tìm eigenvalues và eigenvectors của ma trận nên mình đã sử dụng hàm `np.linalg.eig` của thư viện `numpy` để tìm các giá trị này.

### Các hàm phụ trợ

```python
def sort_eigen_by_values(eigen):
    eigenvalues, eigenvectors = eigen

    sorted_indices = np.argsort(eigenvalues)[::-1]

    sorted_eigenvalues = eigenvalues[sorted_indices]
    sorted_eigenvectors = eigenvectors[:, sorted_indices]

    sorted_eigen = [sorted_eigenvalues, sorted_eigenvectors]

    return sorted_eigen

def pseudo_inverse(A: np.array) -> np.array:
    m, n = A.shape
    if m == n:
        inverse_A = inverse(A)
        return inverse_A
    elif m < n:
        projection = A @ A.T
        inverse_projection = inverse(projection)
        pseudo_inverse = A.T @ inverse_projection

        return pseudo_inverse
    else:
        projection = A.T @ A
        inverse_projection = inverse(projection)
        pseudo_inverse = inverse_projection @ A.T

        return pseudo_inverse

def inverse(A: np.array) -> np.array:
    return np.linalg.inv(A)
```

### Kiểm tra kết quả

```python
A = np.array([
    [1, 2, 3],
    [3, 2, 1],
    [2, 1, 2],
], dtype=float)

U, S, V = singular_value_decomposition(A)
print("U:", U)
print("S:", S)
print("V:", V)
print("U @ S @ V.T:", U @ S @ V.T)
```

```txt
> U: [[-0.6059128   0.70710678 -0.36451293]
 [-0.6059128  -0.70710678 -0.36451293]
 [-0.51549913  0.          0.8568901 ]]
> S: [[5.70156212 0.         0.        ]
 [0.         2.         0.        ]
 [0.         0.         0.70156212]]
> V: [[-6.05912800e-01 -7.07106781e-01  3.64512933e-01]
 [-5.15499134e-01 -1.42255307e-16 -8.56890100e-01]
 [-6.05912800e-01  7.07106781e-01  3.64512933e-01]]
> U @ S @ V.T: [[1. 2. 3.]
 [3. 2. 1.]
 [2. 1. 2.]]
```

## Sử dụng thư viện `numpy`

```python
import numpy as np

A = np.array([
    [1, 2, 3],
    [3, 2, 1],
    [2, 1, 2],
], dtype=float)

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
```

```txt
> U: [[-6.05912800e-01  7.07106781e-01 -3.64512933e-01]
 [-6.05912800e-01 -7.07106781e-01 -3.64512933e-01]
 [-5.15499134e-01  2.77555756e-17  8.56890100e-01]]
> S: [[5.70156212 0.         0.        ]
 [0.         2.         0.        ]
 [0.         0.         0.70156212]]
> V: [[-6.05912800e-01 -7.07106781e-01  3.64512933e-01]
 [-5.15499134e-01  1.11022302e-16 -8.56890100e-01]
 [-6.05912800e-01  7.07106781e-01  3.64512933e-01]]
> U @ S @ V.T: [[1. 2. 3.]
 [3. 2. 1.]
 [2. 1. 2.]]
```
