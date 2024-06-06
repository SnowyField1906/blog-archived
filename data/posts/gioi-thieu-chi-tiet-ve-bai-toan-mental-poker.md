---
title: Giới thiệu chi tiết về bài toán Mental Poker
date: '2023-09-01'
tags: ['ZKP', 'Cryptography', 'Poker Theory']
draft: false
summary: Tìm hiểu chi tiết về cách triển khai Mental Poker bằng một số thuật toán mã hóa đặc biệt cùng với Zero-Knowledge Proof.
layout: PostView
thumbnail: '/static/images/thumbnails/gioi-thieu-chi-tiet-ve-bai-toan-mental-poker.png'
---

_Các trò chơi online ngày nay đang trở thành một phần quan trọng của cuộc sống giải trí của con người. Tuy nhiên, với sự phát triển của các trò chơi này, việc đảm bảo tính bảo mật và an toàn cho người dùng trong những trò chơi yêu cầu tính bảo mật và ẩn danh cao là một thách thức lớn. Điều này trở nên đặc biệt quan trọng khi chúng ta xem xét đến các trò chơi sử dụng tiền bạc thật như các casino._

_Tuy nhiên, vấn đề này có thể được giải quyết bằng cách sử dụng Zero-Knowledge Proof (ZKP) và Blockchain để loại bỏ bên thứ 3, tăng tính bảo mật cho người chơi và tính minh bạch cho trò chơi._

<img className="w-full flex justify-center mx-auto" src="/static/images/thumbnails/gioi-thieu-chi-tiet-ve-bai-toan-mental-poker.png" alt="Chi tiết về thuật toán mã hóa cho Mental Poker" />

> Khuyến nghị đọc trước [Zero-Knowledge Proof là gì và cách hoạt động](https://archive.snowyfield.me/posts/zero-knowledge-proof-la-gi-va-cach-hoat-dong) để sẵn sàng trước khi đi vào bài viết này.

## Giới thiệu về Mental Poker

**Mental Poker** (Poker Tinh thần) là tên gọi chung của một loạt các vấn đề về Cryptography (Mật mã học) liên quan đến việc chơi một trò chơi online mà không cần đếm đến bên thứ 3.

Nhưng tại sao lại là Poker? Vì nó là một ví dụ hoàn hảo để đại diện cho vấn đề trên.
Trong bài viết này, quy ước rằng Poker được đề cập đến là Texas Hold'em.

### Vấn đề của trò chơi online hiện nay

Để hiểu rõ hơn, trong khi mọi người cùng nhau chơi **một ván bài ngoài đời thực**.
Sẽ rất khó để ai đó có thể gian lận (như xem bài của người khác, thay đổi bài của mình,...) mà không bị phát hiện, vì mọi người lúc này đều có thể nhìn thấy các hành động của nhau.

Nhưng hãy tưởng tượng những gì sẽ xảy ra nếu đây là **một ván bài từ xa** thông qua bưu điện?

Sẽ có hai cách để chơi:

1. **Mô hình Peer-to-Peer**: Một người chơi nắm giữ bộ bài và xáo bài, sau đó gửi đi cho những người chơi khác.
2. **Mô hình Client-Server**: Nhờ một người khác làm trung tâm, thực hiện xáo bài và quản lí các lá bài của mọi người.

#### Cách 1: Mô hình Peer-to-Peer

Cách này có mô hình **Peer-to-Peer** (Ngang hàng), đây là một kiểu tương tác giữa các người dùng trong một network. Trong đó, không có một trung tâm nào kiểm soát những người khác, mọi người sẽ tương tác trực tiếp với nhau mà không thông qua bất kì một bên nào.

Nhưng bộ bài lúc này buộc phải nằm trên tay một người chơi nào đó, người thực hiện xáo bài và gửi đi cho những người chơi khác. Điều này đồng nghĩa với việc chúng ta buộc phải tin tưởng không chỉ người này mà toàn bộ những người khác.

Bởi vì người đó có thể biết được toàn bộ bài của mọi người. Hơn nữa, không ai có thể kiểm soát, đưa ra các quyết định hay làm chứng được những gì đang xảy ra.

Vì vậy, cách thứ 2 trông có vẻ ổn hơn.

#### Cách 2: Mô hình Client-Server

Mô hình **Client-Server** (Tập trung) là cách không những các trò chơi online mà hầu đều các dịch vụ internet hiện nay đều sử dụng. Đây cũng là một kiểu tương tác giữa các người dùng trong một network. Trong đó, bất kì thông tin nào cũng đều sẽ phải thông qua một Client (Máy chủ) trung tâm, client này sẽ nắm giữ, quản lí và xử lí các thông tin giữa các Server (Máy khách).

Với cách này, chúng ta sẽ tổ chức trò chơi theo kiểu Dealer (Nhà cái) và người chơi. Dealer sẽ xáo bài và nắm giữ các lá bài của mọi người. Lúc này, người chơi sẽ chỉ việc nhận các thông tin của ván bài từ dealer và gửi các quyết định của mình cho dealer.

Việc dealer nắm giữ thông tin của các người chơi để tránh việc người chơi tương tác trực tiếp với nhau nhằm gian lận là một điều tất yếu. Tuy nhiên, điều này lại đồng nghĩa với việc chúng ta phải tin tưởng vào dealer tuyệt đối, trong khi:

- Dealer hoàn toàn biết được toàn bộ lá bài và có thể thông đồng với một ai đó để giúp họ gian lận.
- Ai đó có thể đe dọa hoặc âm thầm theo dõi dealer để gian lận.
- Dealer có thể thao túng, nói dối người chơi hoặc âm thầm thay đổi giá trị của các lá bài.

#### Kết luận vấn đề

Việc **chơi poker qua bưu điện** chính là một mô hình hóa của hình thức chơi poker online hiện nay (hoàn toàn tương đương nhau).

Rõ ràng dealer là một client (máy chủ), hoàn toàn có thể bị hack hoặc bị thâm nhập bởi các quản trị viên của nó.
Tồi tệ hơn là chúng ta không thể biết được ván bài vừa rồi có bị hack hay bị thao túng hay không.

### Giải pháp

Để giải quyết vấn đề này, chúng ta cần phải loại bỏ dealer ra khỏi trò chơi.
Nhưng lúc này, người thực hiện việc xáo bài và giám sát chính là nhưỡng người chơi, dẫn đến những vấn đề đã đuoọc đề cập [cách 1](#cách-1-mô-hình-peer-to-peer).

Do đó, trò chơi phải được triển khai bằng những bằng những thuật toán mã hóa đặc biệt để giúp người chơi tương tác trực tiếp với nhau nhưng vẫn không cần phải tin tưởng nhau.

## Commutative Encryption

**Commutative Encryption** (Mã hóa Giao hoán) là một phương pháp mã hóa cho phép chúng ta giải mã mà không cần phải theo thứ tự.
Hay nói cách khác, nếu một dữ liệu được mã hóa nhiều lần thì chúng ta có thể giải mã theo bất kỳ thứ tự nào mà vẫn ra đúng dữ liệu ban đầu.

Ví dụ, khi Bob có một tin nhắn từ Alice và tin nhắn này bị mã hóa bởi mật khẩu cả hai, thì dù cho Bob giải mã trước rồi Alice giải mã sau hay ngược lại thì vẫn ra được tin nhắn ban đầu.

Để hình tượng hóa phương pháp này, hãy liên tưởng đến một chiếc hộp đã được khóa và chúng ta muốn khóa thêm một lần nữa:

- Đối với các phương pháp mã hóa thông thường, chúng ta sẽ khóa lên chiếc ổ khóa cũ.
  Lúc này, để mở được hộp, chúng ta phải mở ổ khóa bên ngoài trước để có thể mở ổ khóa bên trong.
- Nhưng đối với Commutative Encryption, chúng ta chỉ việc khóa thêm một ổ khóa.
  Lúc này, chúng ta có thể mở được hộp mà không cần phải quan tâm đến thứ tự mở khóa.

## Đi vào thuật toán

Để đảm bảo người xáo bài cuối cùng không biết được toàn bộ các lá bài, chúng ta cần phải sử dụng một thuật toán xáo bài đặc biệt sử dụng Commutative Encryption.

Thuật toán này sẽ được thực hiện tương tự ví dụ sau.

### Ví dụ về thuật toán

Alice và Bob cùng nhau chơi một ván bài Poker và cùng đồng ý một bộ bài nhất định, có nghĩa là họ biết được và đồng ý về các giá trị và số lượng của các lá bài này.

#### Giai đoạn I: Xáo bộ bài

1. Alice tạo cho mình một mật khẩu và dùng nó mã hóa từng lá bài này.
2. Alice xáo từng lá bài đó theo cách của Alice.
3. Alice gửi bộ này cho Bob.
4. Bob cũng tạo cho mình một mật khẩu và dùng nó để mã hóa lại từng lá bài.
5. Bob xáo lại từng lá bài đó theo cách của Bob.
6. Bob gửi lại bộ bài này cho Alice.

#### Giai đoạn II: Khóa từng lá bài

7. Alice giải mã các lá bài bằng mật khẩu của mình, tuy nhiên nó vẫn còn bị mã hóa bởi mật khẩu của Bob.
8. Alice mã hóa lần nữa từng lá bài, nhưng khác với lần trước, mỗi lá bài sẽ được mã hóa bởi những mật khẩu riêng biệt do Alice nắm giữ.
9. Alice gửi lại bộ bài này cho Bob.
10. Bob giải mã các lá bài bằng mật khẩu của mình, tuy nhiên nó vẫn còn bị mã hóa bởi lớp mật khẩu khác của Alice.
11. Bob mã hóa lần nữa từng lá bài, giống như Alice, mỗi lá bài sẽ được mã hóa bởi những mật khẩu riêng biệt do Bob nắm giữ.
12. Bob gửi lại bộ bài này cho Alice.

#### Giai đoạn III: Giải mã các lá bài của nhau

13. Mỗi bên sẽ nhận được hai lá bài, giả sử Alice sẽ nhận được lá bài thứ 1 và 3, còn Bob nhận được lá bài thứ 2 và 4.
14. Bob gửi cho Alice mật khẩu của lá bài thứ 1 và 3.
15. Alice giải mã hai lá bài trên tay bằng các mật khẩu mà mình đã mã hóa và các mật khẩu mà Bob vừa gửi. Sau đó gửi mật khẩu của lá bài thứ 2 và 4 cho Bob.
16. Bob cũng giải mã hai lá bài trên tay bằng các mật khẩu mà mình đã mã hóa và các mật khẩu mà Alice vừa gửi.
    Lúc này cả hai đều có thể biết được hai lá bài trên tay của mình.

#### Giai đoạn IV: Lật các lá bài trên bàn

17. Alice và Bob sẽ đặt tiền cược và lật các lá bài (từ 5 đến 10). Rõ ràng, các lá bài này chỉ có thể lộ ra khi cả hai cùng đồng thuận lật bài.
    Hay nói cách khác, nếu xảy ra gian lận, chỉ có thể rằng tất cả mọi người cùng nhau đồng ý gian lận.
18. Khi đến với phần xác định người thắng cuộc, Alice và Bob sẽ giải mã các lá bài của nhau để xem bài.

### Kết luận về thuật toán

Như vậy, với thuật toán này, chúng ta có thể đảm bảo rằng người xáo bài cuối cùng không biết được toàn bộ các lá bài.
Đối với những sòng có nhiều người chơi hơn, chúng ta chỉ cần thêm các bước mã hóa và giải mã của họ trong mỗi giai đoạn.

## Triển khai thuật toán

Phía trên là thuật toán chung cho mental poker, do đó chúng ta có nhiều cách để triển khai nó.

Bài viết này sẽ giới thiệu một cách triển khai của Adam Barnett và Nigel P. Smart, chi tiết về nghiên cứu này tại [đây](https://www.researchgate.net/publication/225143036_Mental_Poker_Revisited).

### Quy ước kí hiệu

Kí hiệu $\alpha \overset{{\scriptscriptstyle \operatorname{R}}}{\leftarrow}\mathbb{G}$ cho biết phần tử $\alpha$ được **chọn ngẫu nhiên** từ $\mathbb{G}$.

Kí hiệu $X \hookrightarrow Y$ cho biết ánh xạ $X$ sang $Y$ là một **song ánh**, hay nói cách khác, nó là một ánh xạ một-một và toàn phần.

### Giả định

Cho một nhóm gồm $l$ người chơi được đánh dấu bằng chỉ số $i$:

$$
\begin{align}
i \in \{1, 2, \ldots, l\}
\end{align}
$$

Bộ bài hợp lệ $D$ được dùng trong trò chơi gồm 52 lá bài được biểu diễn như sau:

$$
\begin{align}
D = \{d_1, d_2, \ldots, d_{52}\}
\end{align}
$$

Và 52 lá bài này được đánh dấu bằng chỉ số $j$:

$$
\begin{align}
j \in J = \{1, 2, \ldots, 52\}
\end{align}
$$

Biết rằng với mỗi lá bài $d$ có thể được biểu diễn bằng chất $s$ và bậc $r$:

$$
\begin{align}
d = (s, r) \enspace \text{với} \enspace
\begin{cases}
    s \in \{1, 2, 3, 4\} \\
    r \in \{1, 2, \ldots, 13\}
\end{cases}
\end{align}
$$

Giả định rằng các người chơi đồng ý sử dụng [Finitely Generated Abelian Group](https://en.wikipedia.org/wiki/Finitely_generated_abelian_group) (Nhóm Abel Hữu hạn Sinh) $\mathbb{G}$ cấp $p$ (là một số nguyên tố) và phép toán nhóm $+$, khi đó $G$ là một phần tử sinh:

$$
\begin{align}
G = G(q, +) \in \mathbb{G}
\end{align}
$$

> **📝 Nhắc lại**
>
> Một nhóm Abel hữu hạn sinh là một nhóm Abel mà có thể được tạo ra bằng cách sử dụng một số hữu hạn các phần tử.
>
> Cụ thể, tồn tại một tập hữu hạn các phần tử $G = \{g_1, g_2, \ldots, g_n\}$ trong nhóm $\mathbb{G}$ sao cho mọi phần tử $\alpha$ trong $\mathbb{G}$ có thể biểu diễn được dưới dạng [Linear Combination](https://en.wikipedia.org/wiki/Linear_combination) (Tổ hợp Tuyến tính) của các phần tử trong tập này:
>
> $$
> \alpha = k_1g_1 + k_2g_2 + \ldots + k_ng_n \enspace \text{với} \enspace
> \begin{cases}
>     k_1, k_2, \ldots, k_n \in \mathbb{Z} \\
>     \alpha \in \mathbb{G}
> \end{cases}
> $$
>
> Cấp của nhóm là số lượng các phần tử trong tập $G$, nó là một số nguyên tố, và phép toán của nhóm phải là phép toán giao hoán (cộng hoặc nhân).

Khi đó, tồn tại ánh xạ $\mathcal{M}$ chiếu từ các lá bài sang các phần tử sinh của $\mathbb{G}$. Cho trước một lá bài $d$, có thể tính được $M = \mathcal{M}(d)$ là một phần tử sinh của $\mathbb{G}$.

$$
\begin{align}
\mathcal{M}: D \rightarrow \mathbb{G} \enspace \text{với} \enspace
\begin{cases}
    \mathcal{M}(d) \in \mathbb{G} \\
    \mathcal{M}(d) = \mathcal{M}(d') \iff d = d'
\end{cases}
\end{align}
$$

Với cấp số $p$, ta có tập $\mathbb{Z}_p$ là một [Multiplicative Group of Integers Modulo](https://en.wikipedia.org/wiki/Multiplicative_group_of_integers_modulo_n) (Nhóm Nhân của Số Nguyên Modulo) với modulo là $p$, do đó đảm bảo mọi giá trị từ $\mathbb{Z}$ đều thuộc tập $\{1, 2, \ldots, p-1\}$. Các secret key sẽ được chọn ngẫu nhiên từ tập này.

### Quy trình

#### Tạo khóa

Mỗi người chơi $i$ sẽ tạo cho mình một secret key $sk_i$ và public key $pk_i$ tương ứng:

$$
\begin{align}
sk_i & \overset{{\scriptscriptstyle \operatorname{R}}}{\leftarrow}\mathbb{Z}_{q} \\
pk_i &= sk_i \cdot G
\end{align}
$$

Để ngăn chặn việc người chơi cố tình sử dụng các khóa công khai giả mạo nhằm đánh lừa hoặc phá vỡ hệ thống trò chơi, các người chơi cũng sẽ phải chứng minh được rằng họ thực sự có secret key tương ứng với public key của mình mà không cần phải tiết lộ secret key đó.

Việc này có thể được thực hiện bằng cách sử dụng một giao thức Zero-Knowledge khá cơ bản gọi là [Schnorr’s Identification Protocol](https://www.zkdocs.com/docs/zkdocs/zero-knowledge-protocols/schnorr/) (Giao thức Xác thực Schnorr).

Một khi đã có được tất cả public key hợp lệ từ mọi người, chúng ta sẽ dùng nó để tính public key chung $P$:

$$
\begin{align}
P = \sum_{i=1}^{l} pk_i = \sum_{i=1}^{l} sk_iG
\end{align}
$$

#### Mã hóa lá bài

Mã hóa toàn bộ các lá bài bằng cách sử dụng một **hàm mã hóa** $\varepsilon$ lên từng lá bài, thực tế hàm này là một [Mã hóa ElGamal](https://en.wikipedia.org/wiki/ElGamal_encryption).

Lá bài đã mã hóa $C$ có thể được mã hóa thêm lần nữa bằng cách cộng với một **số bí mật** $\delta$ như sau:

$$
\begin{align}
C' &= \varepsilon_P(C) \\
&= C + \delta \\
&= \begin{pmatrix} C_1 \\ C_2 \end{pmatrix} + \begin{pmatrix} rG \\ rP \end{pmatrix} \\
&= \begin{pmatrix} C_1 + rG \\ C_2 + rP\end{pmatrix} \enspace \text{với} \enspace r \overset{{\scriptscriptstyle \operatorname{R}}}{\leftarrow}\mathbb{Z}_{q}
\end{align}
$$

Trong đó, $r$ là một **số ngẫu nhiên bí mật** được tạo ra bởi người chơi đó để mã hóa lá bài.

Tuy nhiên ở lượt mã hóa đầu tiên, lá bài vẫn đang ở dạng chuẩn $M \in \mathbb{G}$, cho nên nó sẽ được chuyển hóa thành $C \in \mathbb{G} \times \mathbb{G}$ như sau:

$$
\begin{align}
C = \begin{pmatrix} C_1 \\ C_2 \end{pmatrix} = \begin{pmatrix} 0 \\ M \end{pmatrix}
\end{align}
$$

Do đó, ở lượt mã hóa đầu tiên, kết quả sẽ là:

$$
\begin{align}
C' = \begin{pmatrix} rG \\ M + rP \end{pmatrix}
\end{align}
$$

#### Giải mã lá bài

Qua các công thức trên, ta có thể thấy một lá bài được mã hóa
$C = \begin{pmatrix} C_1 \\ C_2 \end{pmatrix}$
gồm hai thành phần $C_1$ và $C_2$ và chúng có cùng hệ số $r$. Để giải mã lá bài được mã hóa $C$, người chơi $i$ cần sử dụng secret key $sk_i$ của mình để tính giá trị $D$:

$$
\begin{align}
D &= sk_i \cdot C_1 \\
\end{align}
$$

Tập hợp các giá trị $D$ từ tất cả mọi người (những người đã mã hóa lá bài) sẽ giải mã được $C$:

$$
\begin{align}
M = C_2 - \sum_{i=1}^{l} D_i
\end{align}
$$

> **💁‍♀️ Giải thích**
>
> Ta có thể chứng minh được công thức trên như sau:
>
> $$
> \begin{align*}
> C_2 - \sum_{i=1}^{l} D_i &= C_2 - \sum_{i=1}^{l} sk_iC_1 \\
> &= (M + rP) - \sum_{i=1}^{l} sk_i(rG) \\
> &= M + rP - r\sum_{i=1}^{l} sk_iG \\
> &= M + rP - rP \tag*{\text{xem lại} (9)} \\
> &= M
> \end{align*}
> $$

#### Xáo bài

Làm sao để đảm bảo bộ bài mà ai đó xáo là hợp lệ? Hay nói cách khác, bộ bài sau khi được xáo phải khớp với bộ bài ban đầu, không có lá bài nào bị thêm vào hay bị bỏ đi.

Lúc này, chúng ta sẽ áp dụng Zero-Knowledge Proof để chứng minh rằng bộ bài sau khi **mã hóa và xáo** là hợp lệ mà không cần phải tiết lộ **thứ tự các lá bài**, **quá trình xáo** hoặc **quá trình mã hóa**.

Trước tiên, cơ chế **mã hóa và xáo** được thực hiện cùng lúc bằng cách chọn một **tập hợp các số bí mật** $\Delta$ dùng để mã hóa:

$$
\begin{align}
\Delta = \{\delta_1, \delta_2, \ldots, \delta_{52} \}
\end{align}
$$

Và một **hàm hoán vị bí mật** $\Pi$, đóng vai trò như một **hàm hoán vị** dùng để xáo trộn thứ tự của các chỉ mục $j$ cho lá bài, do đó có thể xem đây là một song ánh:

$$
\begin{align}
\Pi: J \hookrightarrow  J' \enspace \text{với} \enspace J = J'
\end{align}
$$

Vì tổng có tính chất giao hoán, nên tổng của các chỉ mục $J$ ban đầu sẽ luôn bằng tổng của các chỉ mục $J'$ sau khi hoán vị:

$$
\begin{align}
\text{Đặt} \enspace \pi_j = \Pi(j) \implies \sum_{j=1}^{52} j = \sum_{j=1}^{52} \pi_j
\end{align}
$$

Khi đó bộ bài $D$ sẽ được xáo thành $D'$ với theo từng lá bài:

$$
\begin{align}
d'_j = d_{\pi_j} + \delta_j
\end{align}
$$

##### Chứng minh

Chọn ngẫu nhiên một số $z \overset{{\scriptscriptstyle \operatorname{R}}}{\leftarrow}\mathbb{Z}_{q} \setminus \{0, 1\}$, lí do $z \notin \{0, 1\}$ là vì chúng ta sẽ dùng số này để nhân với các lá bài.

Một lượt xáo bài hợp lệ là khi:

$$
\begin{align}
\sum_{j=1}^{52} z^{j}d_j = \sum_{j=1}^{52} z^{\pi_j}(d_j' - \delta_j)
\end{align}
$$

Vế trái sẽ là đa thức của Verifier (người xáo bài trước) vì vế này chỉ sử dụng $d_j$ là thứ tự các lá bài mà người này thực hiện xáo.

Trong khi đó vế phải là đa thức của Prover (người xáo bài lần này), vì chỉ người này mới có những thông tin bí mật như $\delta_j$ hay $\pi_j$.

Khi đó, một người sau khi xáo xong sẽ gửi cho người trước một Zero-Knowledge Proof là $\sum_{j=1}^{52} z^{j}d_j$. Với ZKP này, người trước có thể kiểm tra được rằng bộ bài sau khi xáo là hợp lệ mà vẫn không biết được thông tin về thứ tự các lá bài.

##### Giải thích

Chúng ta sẽ chứng minh công thức trên như sau.

Cho một nhân tử bất kì $G$ là một phần tử sinh của $\mathbb{G}$, con số bất kì này không quan trọng:

$$
\begin{alignat}{7}
& Đặt \enspace && x_j && = \frac{d_j}{G}, && \quad y_j && = \frac{d_j'}{G}, && \quad z_j && = \frac{\delta_j}{G} \notag \\
& \implies && d_j && = x_jG, && \quad d_j' && = y_jG, && \quad \delta_j && = z_jG \\
\end{alignat}
$$

Thay những giá trị này vào công thức trên, ta được:

$$
\begin{align*}
\left(\sum_{j=1}^{52} z^{j}x_j\right)G &= \left(\sum_{j=1}^{52} z^{\pi_j}(y_j - z_j)\right)G \\
\iff \sum_{j=1}^{52} z^{j}x_j &= \sum_{j=1}^{52} z^{\pi_j}(y_j - z_j) \\
\iff \sum_{j=1}^{52} z^{\pi_j}x_{\pi_j} &= \sum_{j=1}^{52} z^{\pi_j}(y_j - z_j) \tag*{\text{xem lại} (20)} \\
\iff x_{\pi_j} &= y_j - z_j \\
\implies x_{\pi_j}G &= y_jG - z_jG \\
\iff d_{\pi_j} &= d_j' - \delta_j \tag*{\text{xem lại} (23)}
\end{align*}
$$

## Kết luận

Pheeew! Chúng ta đã đi qua rất nhiều công thức phức tạp, nhưng nếu hiểu được nó, chúng ta có thể dễ dàng chuyển đổi nó thành code. Còn nếu không thì hãy bình luận bên dưới những thắc mắc để được trợ giúp nhé 😉
