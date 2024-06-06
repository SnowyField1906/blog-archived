---
title: Giới thiệu về Uniswap V3
date: '2023-09-16'
tags: ['Uniswap', 'DEX', 'Blockchain']
draft: true
summary: Tìm hiểu về những vấn đề của Uniswap V2, cùng với những cải tiến và đặc điểm nổi bật của Uniswap V3.
layout: PostView
thumbnail: '/static/images/thumbnails/gioi-thieu-ve-uniswap-v3.png'
---

_Sau khi ra mắt V2, kì lân Uniswap đã trở thành gã khổng lồ thống trị và thay đổi cuộc chơi trong lĩnh vực DeFi. Vào cuối tháng 5/2021, Uniswap đã chính thức ra mắt phiên bản V3 với nhiều cải tiến đáng kể. Bài viết này sẽ tập trung giới thiệu về Uniswap V3 và các cải tiến của nó._

_Mình đã dự định làm những bài viết phân tích chi tiết về phần toán học và kĩ thuật bên trong Uniswap V3 nhưng thực sự mình khá lười vì nó sẽ rất dài, đơn giản là vì cơ chế bên trong Uniswap rất phức tạp và cực kì khó hiểu._

<img className="w-full flex justify-center mx-auto" src="/static/images/thumbnails/gioi-thieu-ve-uniswap-v3.png" alt="Giới thiệu về Uniswap V3" />

Khuyến nghị đọc trước [Phân tích chi tiết DEX dưới góc nhìn kĩ thuật (Phần 1 - AMM)](https://archive.snowyfield.me/posts/phan-tich-chi-tiet-dex-duoi-goc-nhin-ki-thuat-phan-1) để sẵn sàng trước khi đi vào bài viết này.

## Tổng quan

Uniswap V3 là **Concentrated Liquidity** DEX đầu tiên để giải quyết các vấn đề trong Uniswap V2 nói chung và các DEX AMM bấy giờ nói riêng.

### Các vấn đề của Uniswap V2

#### Liquidity sẽ bị lãng phí trong các pool là một cặp stable coin

Hãy tưởng tượng có một dịch vụ kiếm tiền bằng cách cung cấp nước cho các bể bơi, số tiền nhận được sẽ được tính theo độ cao của nước mà được đổ vào bể.

Nó có thể hoạt động hiệu quả đối với những hồ bơi nơi mà mọi người bơi khắp mọi nơi, nhưng đối với các hồ bơi cho trẻ em (nơi họ chỉ bơi ở khu vực có độ sâu dưới $1$m), việc phải cung cấp nước cho cả những khu vực $1$m trở lên là vô cùng lãng phí vì khoảng này không được sử dụng, dẫn đến việc lãng phí nước vì lợi nhuận được tính theo độ cao mà mực nước dâng lên.

Thậm chí AMM được ví như một bể bơi vô cực, nhưng hãy ví dụ đây là một bể bơi dài $1000$m (bỏ qua chiều rộng). Nếu được cung cấp $2000$m nước, bể chỉ cao thêm được $2$m. Trong khi ở một vài trường hợp, người ta chỉ dùng đến $10$m đầu tiên của bể, có nghĩa là họ chỉ nhận được $2$m nước với một lượng nước khổng lồ đã cung cấp.

Cách giải quyết là chia bể ra thành những đoạn $10$m, lúc này người cung cấp nước có thể được chọn những phần mà mình muốn cung cấp, nếu họ cung cấp cho đúng $10$m đầu tiên, độ cao sẽ tăng lên $200$m (lợi nhuận đã tăng lên đến $200$%).

<figure>
<img
    className="w-full flex justify-center mx-auto"
    src="/static/images/posts/uniswap-positions-comparison.png"
    alt="So sánh các khoảng liquidity được phân bố trong Uniswap V2 và V3"
/>
<figcaption>Source: uniswap.com</figcaption>
</figure>

Các cặp stable coin chính là một bể dành cho trẻ em, vì giá của nó gần như không có biến động. Cụ thể đối với cặp DAI/USDC, giá của nó luôn giao động trong khoảng $[0.99; 1.01]$, có nghĩa là nó chỉ sử dụng liquidity trong khoảng này. Mặc khác, đối với các cặp như BTC/USDC, cũng sẽ không bao giờ có giá dưới $10.000$ hay trên $100.000$.

#### LP không tận dụng được vốn

Trong Uniswap V2, vì liquidity được cung cấp trên toàn bộ đường cong, LP phải cung cấp đủ 2 token với tỉ lệ là tỉ giá hiện tại để giữ liquidity trong pool được đồng đều. Mục đích là vì giá của pool được tính dựa trên liquidity của 2 token, cho nên việc này đảm bảo giá sẽ không bị dịch chuyển sau khi tác động lên liquidity.

Ví dụ, nếu LP có $1$ ETH và $5.000$ USDT và muốn cung cấp liquidity cho một pool ETH/USDT có giá là $2.000$. Thì LP chỉ có thể cung cấp $1$ ETH và $2.000$ USDT, còn $3.000$ USDT còn lại sẽ không được sử dụng.

Mấu chốt của việc giá của pool bị dịch chuyển và vì điểm giá này nằm trong đoạn liquidity đang cung cấp. Với cách giải quyết chia bể thành nhiều đoạn, LP có thể cung cấp liquidity cho một loại token mà họ muốn nếu đoạn cung cấp này nằm ngoài điểm giá vì giá sẽ không bị ảnh hưởng.

### Các ưu điểm của Uniswap V3

#### LP có thể chủ động với chiến lược của mình

Trong khi Uniswap V2 buộc LP chỉ có thể cung cấp giá cho toàn bộ các điểm giá, thì Uniswap V3 có thể giúp LP nghiên cứu thị trường và chọn ra điểm giá phù hợp mà họ đã dự đoán để cung cấp.

Tất nhiên nếu giá pool ở bên ngoài đoạn liquidity mà LP cung cấp (không có lượt trade bên trong đoạn) thì LP sẽ không thu được lợi nhuận.

#### Vốn được tối ưu hóa

LP có thể tận dụng từng token của mình để sinh lời. Trong khi Uniswap V2 buộc LP phải cung cấp đủ 2 token theo tỉ lệ hiện tại với lợi nhuận vô cùng thấp.

#### Các cặp stable coin tận dụng được lượng liquidity lớn

Các cặp stable coin sẽ có lượng liquidity lớn rất nhiều với cơ chế này, khi tất cả liquidty đều đổ dồn vào một đoạn giá rất nhỏ thay vì trải dài ra trên toàn bộ đường cong.

<figure>
<img
    className="w-full flex justify-center mx-auto"
    src="/static/images/posts/v3-stable-coin-efficiency.png"
    alt="Stable coin tận dụng được lượng liquidity lớn"
/>
<figcaption>Source: uniswap.com</figcaption>
</figure>

### Kết luận

Có thể thấy V3 chủ yếu tập trung tạo điều kiện cho LP, đơn giản bởi vì đây là AMM. Khác với Order Book, nơi người mua và người bán có quyền như nhau (vì họ cung cấp liquidity cho nhau). Thì trong AMM, LP là người cung cấp liquidity cho người dùng, vì vậy họ nắm giữ sự sống AMM đó và phải được ưu tiên tối đa.

## Các cải tiến của Uniswap V3

### Đường cong mới

Uniswap V3 định nghĩa mỗi điểm giá chính là một **Tick**, các tick này chia đường cong thành nhiều đoạn nhỏ. Một **Price Range** (Khoảng Giá) sẽ được xác định bởi 2 tick gần nhất.

<figure>
<img
    className="w-full md:w-1/2 flex justify-center mx-auto"
    src="/static/images/posts/v3-curve-with-ticks.png"
    alt="Các tick trên đường cong của Uniswap V3"
/>
<figcaption>Source: uniswapv3book.com</figcaption>
</figure>

Các price range này hoạt động hoàn toàn giống như 1 pool V2, tuy nhiên giá sẽ không bao giờ đến vô cùng vì nó đã bị giới hạn với 2 tick đầu cuối. Nếu giá đi ra khỏi một tick, nó sẽ đi đến price range liền kề tiếp theo.

<figure>
<img
    className="w-full md:w-1/2 flex justify-center mx-auto"
    src="/static/images/posts/a-price-range.png"
    alt="Một price range trong Uniswap V3"
/>
<figcaption>Source: uniswapv3book.com</figcaption>
</figure>

Do đó chúng ta gọi những đường cong này là _Virtual Curve_ (Đường cong Ảo) vì thực thế nó là đường cong V2 nhưng bị dịch vào gần gốc tọa độ $O$ một khoảng để giao với 2 trục tọa độ $x$ và $y$.

### Công thức mới

Chúng ta có lẽ đã quen với công thức $x \times y = k$ trong Uniswap V2. Tuy nhiên trong Uniswap V3, liquidity được tính bằng trung bình nhân của $x$ và $y$:

$$
L = \sqrt{x \times y}
$$

### Tick

Tick chỉ là một đơn vị dùng để tính toán bên trong contract, người dùng không cần quan tâm đến nó vì trên thực tế đây chính là các điểm giá.
