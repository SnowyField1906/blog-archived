---
title: Hiểu sâu về Markov Decision Process (Phần 2 - Policy Iteration)
date: '2023-11-12'
tags: ['Reinforcement Learning', 'Machine Learning', 'Probability', 'Mathematics']
draft: false
summary: Loạt bài viết này sẽ giúp chúng ta hiểu sâu về Markov Decision Process cùng với cách xây dựng và triển khai hai thuật toán phổ biến là Policy Iteration và Value Iteration
layout: PostView
thumbnail: '/static/images/thumbnails/hieu-sau-ve-markov-decision-process.png'
---

_Markov Decision Process (MDP) là một bài toán Dynamic Programming (Quy hoạch Động) được sử dụng rất nhiều trong các lĩnh vực công nghệ và đóng vai trò đặc biệt trong Reinforcement Learning (Học Tăng cường). MDP được sử dụng để mô hình hóa việc ra quyết định trong các tình huống mà kết quả là một phần ngẫu nhiên và một phần dưới sự điều khiển của người ra quyết định._

_Loạt bài viết này sẽ giúp chúng ta hiểu sâu về Markov Decision Process cùng với cách xây dựng và triển khai hai thuật toán phổ biến là Policy Iteration và Value Iteration._

<img className="w-full flex justify-center mx-auto" src="/static/images/thumbnails/hieu-sau-ve-markov-decision-process.png" alt="Hiểu sâu về Markov Decision Process" />

Khuyến nghị đọc trước [Phần 1](https://snowyfield.software/posts/hieu-sau-ve-markov-decision-process-phan-1) để sẵn sàng trước khi đi vào bài viết này.

### Utility

#### Khái niệm Utility

**Utility** (Tiện ích) hay **Value** (Trị số) là một giá trị thể hiện mức độ "tiềm năng" của một State. Policy sẽ chọn Action có Utility cao nhất để thực hiện.

Lí do là vì sẽ có một vài State có Reward như nhau, nhưng thực tế nó không tiềm năng như nhau. Ví d, có 2 công ty đều có cùng lợi nhuận ở thời điểm hiện tại, nhưng công ty A kinh doanh một mặt hàng có tiềm năng trong tương lai, còn công ty B kinh doanh một mặt hàng được dự đoán là sẽ bị lỗi thời. Do đó, chúng ta cần phải tránh **đầu tư** (đi đến) **công ty** (State) B.

Chúng ta kí hiệu Utility là $u \in \mathbb{R}$, với $n$ là số lượng State có thể đến được. Vì mỗi State tương ứng với một Utility, ta có thể truy xuất một Utility từ một State bằng mapping function $\mathcal{U}$:

$$
\begin{align}
\mathcal{U} : S &\mapsto \mathbb{R} \notag \\
\mathcal{U}(s) &= u \\
\end{align}
$$

Các State nào càng gần đích thì càng có Utility cao. Vì thế chúng ta cần phải tối ưu $\mathcal{U}$ nhất có thể.

#### Utility trong game Pac-Man

Như đã nói ở trên, tuy các vị trí là đường đi có Reward đều là $-0.1$, nhưng chúng ta cần tránh đi đến các vị trí xa thức ăn và tập trung đi đến các vị trí gần thức ăn.

Do đó, ta sẽ lưu vào mỗi STATE một VALUE lưu trữ mức độ tốt của nó trong việc dẫn đến đích

### Nâng cấp Policy

#### Khái niệm Policy

Tất nhiên là Action này phải là Action dẫn đến State có Utility cao nhất trong các State có thể đến được. Do đó thuật toán của Policy khá đơn giản như sau:

$$
\begin{align}
\mathcal{\pi}(s) = \arg \max_{a \in A} \mathcal{U}(\mathcal{M}(s, a)) \\
\end{align}
$$
