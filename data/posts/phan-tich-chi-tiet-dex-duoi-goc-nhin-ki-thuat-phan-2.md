---
title: Phân tích chi tiết DEX dưới góc nhìn kĩ thuật (Phần 2 - Order Book)
date: '2023-08-08'
tags: ['DEX', 'DeFi', 'Blockchain']
draft: false
summary: Qua bài viết này chúng ta sẽ hiểu được chi tiết cách hoạt động của 2 mô hình DEX phổ biến hiện nay là Automated Market Maker và Order Book.
layout: PostView
thumbnail: '/static/images/thumbnails/phan-tich-chi-tiet-dex-duoi-goc-nhin-ki-thuat.png'
---

_Trong hệ sinh thái DeFi, DEX đã nhanh chóng trở thành một phần quan trọng của việc trao đổi tài sản mã hoá và cung cấp thanh khoản. Điểm độc đáo của DEX so với các sàn truyền thống nằm ở việc chúng không cần sự can thiệp của bên thứ ba và hoạt động dựa trên các nguyên tắc của công nghệ Blockchain._

_Trong bài viết này, chúng ta sẽ cùng nhau khám phá một cách chi tiết về cách hoạt động của DEX, tập trung vào hai mô hình phổ biến: Automated Market Maker (AMM) và Order Book. Bằng cách hiểu rõ cách mỗi mô hình hoạt động, chúng ta sẽ có cái nhìn sâu hơn về cách DEX đóng góp vào sự phát triển của hệ sinh thái DeFi._

<img src='/static/images/thumbnails/phan-tich-chi-tiet-dex-duoi-goc-nhin-ki-thuat.png' alt="Phân tích chi tiết DEX dưới góc nhìn kĩ thuật" />

Ở [Phần 1 - AMM](https://snowyfield.vercel.app/posts/phan-tich-chi-tiet-dex-duoi-goc-nhin-ki-thuat-phan-1), chúng ta đã tìm hiểu về cách hoạt động của một AMM.
Lần này, chúng ta sẽ đến với một mô hình DEX khác là Order Book.

## Giới thiệu về DEX

### Khái niệm

**Decentralized Exchange** (DEX) là nền tảng cho phép người dùng trao đổi các tài sản mã hoá mà không cần đến sự trung gian của ngân hàng hay tổ chức truyền thống.

Một DEX bao gồm nhiều cặp tiền mã hóa để người dùng có thể trao đổi và mua bán trực tiếp các loại tiền mã hóa cho nhau. Hoạt động trên nguyên tắc của công nghệ Blockchain, DEX giúp tăng tính minh bạch, an toàn và ẩn danh trong giao dịch.

Hai mô hình phổ biến trong DEX là **Automated Market Maker** (AMM) và **Order Book**.

Trong đó AMM là mô hình được sử dụng rộng rãi nhất vì tính đơn giản, dễ sử dụng và hoạt động tốt ngay cả khi liquidity thấp.
Điều này làm cho AMM thích hợp cho các DEX vì chúng thường có liquidity không cao.

Trong khi mô hình Order Book lại được sử dụng nhiều hơn trong các sàn giao dịch tập trung, gọi là **Centralized Exchange** (CEX).
Lí do là vì Order Book cung cấp nhiều khả năng cũng như linh hoạt hơn, nhưng cũng yêu cầu liquidity cao hơn để có thể phát huy tác dụng.

## Mô hình Order Book

### Các thuật ngữ cơ bản

- **Token Pair**: Là cặp tiền mã hoá được sử dụng để trao đổi với nhau, thường kí hiệu là Base/Quote.
- **Base**/**Quote Token**: Lần lượt là tiền mã hoá được dùng để **Giao dịch** và **Định giá**. Ví dụ trong pair ETH/USDT, ETH là **Base Token** và USDT là **Quote Token**.
- **Order**: Là lệnh mua hoặc bán một token trong một pair tại một thời điểm nhất định.
- **Position**: Là vị thế của một người dùng, nó thể hiện số lượng token mà người dùng đang nắm giữ và đang mượn từ sàn.
- **Bid**/**Ask**: Lần lượt là hành động **Mua** và **Bán** một token trong một pair.
- **Long**/**Short**: Lần lượt là hành động dự đoán giá sẽ **Tăng** hay **Giảm** của một token trong một pair.
- **Trade**: Là hành động trao đổi (có thể là mua hoặc bán) giữa hai token trong pair.
- **Liquidity**: Là số lượng thanh khoản của pair. Con số này biểu thị khả năng mua bán của pair.
- **Spread**: Là sự chênh lệch giữa giá mua và giá bán của một token.
- **Depth**: Là tổng số lượng token có thể được mua hoặc bán ở một mức giá cụ thể.

### Khái niệm và nguyên tắc hoạt động của Order Book

**Order Book** (Sổ Lệnh) là một hệ thống ghi chép các bid/ask order (lệnh mua/bán) từ người dùng.

Thông qua Order Book, chúng ta có thể đặt một bid/ask order với giá mong muốn và đợi cho đến khi có một bid/ask order khác khớp với giá mà chúng ta đã đưa ra.
Cách hoạt động này mô phỏng hoàn chỉnh một thị trường trong tự nhiên, nơi mà người mua và người bán có thể tự do tìm nhau và thỏa thuận về giá.

Order Book thường chia thành hai phần chính:

- **Bid**: Bao gồm các bid order. Những order này được sắp xếp theo thứ tự giảm dần của giá. Bid order có giá cao nhất sẽ được đặt ở đầu danh sách.
- **Ask**: Bao gồm các ask order. Những order này được sắp xếp theo thứ tự tăng dần của giá. Ask order có giá thấp nhất sẽ được đặt ở đầu danh sách.

Lý do các order được sắp xếp như vậy là vì đối với bên mua, giá có lợi nhất cho họ là giá thấp nhất, ngược lại giá có lợi nhất cho bên bán là giá cao nhất.
Hai giá tốt nhất này sẽ được đặt cạnh nhau ở giữa như ranh giới tranh chấp giữa 2 bên, giá của một pair sẽ thay đổi khi một bên thắng được bên còn lại.

Nhiều người có thể đặt nhiều order với cùng một mức giá, order này sẽ nằm trong queue (hàng đợi) tại mức giá đó theo nguyên tắc FIFO (First In First Out).
Điều này có nghĩa là tại một mức giá, order nào được đặt trước sẽ được khớp trước.

<figure>
<img
    className="w-full md:w-1/2"
    src="/static/images/posts/order-book-example.png"
    alt="Ví dụ về một Order Book"
/>
<figcaption>Source: binance.com</figcaption>
</figure>

Qua hình ảnh trên, ta có thể thấy rằng các giá được sắp xếp theo tứ tự, và ở ngay chính giữa là giá hiện tại của pair.

Giá cao nhất mà bên mua (màu xanh) có thể chấp nhận được là $0.3839$, nếu một ai đó sẵn sàng mua với giá cao hơn nữa, cụ thể là $0.3940$,
thì nó sẽ khớp với giá thấp nhất mà bên bán (màu đỏ) có thể chấp nhận được.

Nếu sức mua quá mạnh dẫn đến liquidity tại giá $0.3940$ được mua hết, giá của pair sẽ tăng lên $0.3940$.

## Các thành phần của Order Book

### Spot Trading

#### Nguyên tắc hoạt động của Spot Trading

**Spot Trading** (Giao dịch Giao ngay) là một hình thức trade cơ bản nhất, người dùng chỉ đơn giản là mua hoặc bán một token như bình thường.

Hình thức này gồm 2 loại giao dịch chính là **Market Order** và **Limit Order**.

##### Market Order

**Market Order** (Lệnh Thị trường) là một bid/ask order với giá của thị trường hiện tại.
Lệnh này sẽ được khớp ngay lập tức với order bid/ask có giá tốt nhất, nếu giá này được khớp hết thì order sẽ được khớp với giá tiếp theo.

##### Limit Order

**Limit Order** (Lệnh Giới hạn) là một bid/ask order với giá được đặt trước.
Nếu không được khớp, order này sẽ được đưa vào queue và chờ đến khi có một order bid/ask khác khớp với giá mà chúng ta đã đưa ra.

#### Ví dụ về Spot Trading

Giả sử chúng ta có một Order Book như sau:

<table>
    <tr>
        <th>Giá</th>
        <th>Số lượng</th>
        <th>Loại order</th>
    </tr>
    <tr>
        <td>6</td>
        <td>30</td>
        <td>Ask</td>
    </tr>
    <tr>
        <td>5</td>
        <td>20</td>
        <td>Ask</td>
    </tr>
    <tr>
        <td>4</td>
        <td>10</td>
        <td>Ask</td>
    </tr>
    <tr className="text-left">
        <td colspan="4" className="text-center font-bold">Giá hiện tại: 3</td>
    </tr>
    <tr>
        <td>3</td>
        <td>10</td>
        <td>Bid</td>
    </tr>
    <tr>
        <td>2</td>
        <td>20</td>
        <td>Bid</td>
    </tr>
    <tr>
        <td>1</td>
        <td>30</td>
        <td>Bid</td>
    </tr>
</table>

##### Ví dụ về Limit Order

Nếu muốn mua $15$ token với giá $3$, chúng ta sẽ phải trả $3 \times 15 = 45$ quote token.
Order này sẽ được đưa vào queue của bid và chờ được khớp.

Lúc này, Order Book sẽ được cập nhật như bên dưới:

<table>
    <tr>
        <td>6</td>
        <td>30</td>
        <td>Ask</td>
    </tr>
    <tr>
        <td>5</td>
        <td>20</td>
        <td>Ask</td>
    </tr>
    <tr>
        <td>4</td>
        <td>10</td>
        <td>Ask</td>
    </tr>
    <tr className="text-left">
        <td colspan="4" className="text-center font-bold">Giá hiện tại: 3</td>
    </tr>
    <tr>
        <td>3</td>
        <td className="font-bold">25</td>
        <td>Bid</td>
    </tr>
    <tr>
        <td>2</td>
        <td>20</td>
        <td>Bid</td>
    </tr>
    <tr>
        <td>1</td>
        <td>30</td>
        <td>Bid</td>
    </tr>
</table>

##### Ví dụ về Market Order

Nếu muốn mua ngay lập tức $15$ token, chúng ta sẽ phải trả $4 \times 10 + 5 \times 5 = 70$ quote token.
Có nghĩa là order này sẽ được khớp với giá ask tốt nhất, cụ thể là $10$ token với giá $4$.
Còn lại $5$ token sẽ được khớp với order ask tiếp theo, cụ thể là $5$ token với giá $5$.

Lúc này, Order Book sẽ được cập nhật như bên dưới:

<table>
    <tr>
        <td>6</td>
        <td>30</td>
        <td>Ask</td>
    </tr>
    <tr>
        <td>5</td>
        <td className="font-bold">15</td>
        <td>Ask</td>
    </tr>
    <tr className="text-left">
        <td colspan="4" className="text-center font-bold">Giá hiện tại: 4</td>
    </tr>
    <tr>
        <td>3</td>
        <td>10</td>
        <td>Bid</td>
    </tr>
    <tr>
        <td>2</td>
        <td>20</td>
        <td>Bid</td>
    </tr>
    <tr>
        <td>1</td>
        <td>30</td>
        <td>Bid</td>
    </tr>
</table>

### Margin Trading

#### Nguyên tắc hoạt động của Margin Trading

**Margin Trading** (Giao dịch Ký quỹ) là một hình thức trade có thể kiếm được lợi nhuận rất cao, nhưng cũng có nguy cơ rủi ro rất lớn.

Margin Trading cho phép mở một order giao dịch lớn hơn so với số token thực sự có thông qua việc sử dụng token vay từ sàn giao dịch bằng cơ chế đòn bẩy.
Điều này cho phép tiềm năng tạo ra lợi nhuận lớn hơn từ biến động giá của tài sản, nhưng cũng đồng nghĩa với việc tăng rủi ro và khả năng mất vốn nhanh chóng.

##### Equity

**Equity** (Vốn riêng) là số token thực sự đầu tư vào giao dịch.
Ví dụ, nếu chúng ta có 10 token và muốn sử dụng 100% equity cho giao dịch, thì 10 token đó sẽ là equity.

##### Borrowed Capital

**Borrowed Capital** (Vốn vay) là số token vay từ sàn giao dịch để mở position lớn hơn.
Ví dụ, nếu chúng ta có 10 USD equity và muốn sử dụng đòn bẩy 10x,
chúng ta có thể mở position trị giá 100 USD với 10 USD equity và 90 USD borrowed capital.

##### Leverage Ratio

**Leverage Ratio** (Mức Đòn bẩy) là tỷ lệ giữa tổng trị giá và equity.
Ví dụ, sử dụng đòn bẩy 10x thì tỷ lệ này là 10:1,
có nghĩa là mỗi đơn vị equity cho phép mở position có trị giá 10 đơn vị.

##### Margin Call

**Margin Call** (Gọi Ký quỹ) là một cảnh báo nếu tài khoản có nguy cơ không đủ tiền để duy trì position.

Cụ thể, khi mở position, một phần margin sẽ bị đóng băng trong tài khoản.
Điều này đảm bảo rằng người dùng có đủ tiền để duy trì vị thế trong trường hợp giá di chuyển ngược lại dự đoán của họ.
Khi giá di chuyển ngược lại và lỗ của bắt đầu tăng lên, margin không bị ảnh hưởng nếu lỗ vẫn còn trong phạm vi cho phép.
Tuy nhiên, một khi lỗ tiến gần mức margin đóng băng, sàn giao dịch có thể gửi một margin call.

Lúc này sẽ phải đóng position lại hoặc nạp thêm equity để tránh bị forced liquidation.

##### Forced Liquidation

**Forced Liquidation** (Thanh lý Bắt buộc) là một cơ chế để đảm bảo rằng các position không bị âm.

Cụ thể sàn giao dịch sẽ đóng position đó và thu hồi tất cả borrowed capital.

#### Ví dụ về Margin Trading

Giả sử chúng ta muốn mở một long position trị giá $100$ token với đòn bẩy 10x.
Chúng ta sẽ bỏ ra $10$ token equity làm thế chấp và có $90$ token làm borrowed capital.

Nếu giá token tăng lên 50%, chúng ta có thể nhận được $50$ token lợi nhuận.
Con số này gấp 10 lần số token chúng ta đầu tư ban đầu,
khi mà nếu chỉ sử dụng $10$ token equity đang có thì chúng ta chỉ nhận được $5$ token lợi nhuận.

Tuy nhiên, một khi giá giảm xuống 10%, trị giá position này sẽ chỉ còn $90$ token.
Lúc này, chúng ta đã lỗ $10$ token, chính là số token equity ban đầu. Chúng ta sẽ mất toàn bộ vốn và bị margin call.

### Futures Trading

#### Nguyên tắc hoạt động của Futures Trading

**Futures Trading** (Giao dịch Hợp đồng tương lai) là một cam kết mua hoặc bán một token vào một thời điểm trong
tương lai với một Future Price (Mức giá Tương lai) đã xác định và thỏa thuận trước trong Future Contract (Hợp đồng Tương lai).

Lợi nhuận của Futures Trading được tính dựa trên sự chênh lệch giữa giá thực tế khi đó của token và future price đã cam kết.

#### Ví dụ về Futures Trading

Giả sử có một pair với giá là $100$ token, chúng ta dự đoán rằng giá sẽ giảm xuống $50$ token trong vòng 30 ngày.
Khi đó, chúng ta có thể mở một position là bán với giá $150$ token trong thời hạn là 30 ngày.

Nếu đúng như dự đoán, giá của pair đã giảm, có thể là $75$ token, thì chúng ta vẫn bán được với giá $150$ token đã cam kết.
Lúc này, lợi nhuận thu được là gấp $150/75 = 2$ lần số token mà đáng ra sẽ nhận được.

Tuy nhiên, nếu giá của pair tăng mạnh, có thể là $300$ token thì chúng ta sẽ phải bán với giá $150$ token mặc dù giá thực tế là $300$.
Lúc này, chúng ta sẽ lỗ gấp $300/150 = 2$ lần số token mà đáng ra sẽ nhận được.

### Ưu nhược điểm của Order Book

#### Ưu điểm

- **Trượt giá thấp**: Trượt giá rất khó xảy ra trên Order Book, điều này giúp người dùng luôn tính toán được lượng token mong muốn.
- **Nhiều khả năng**: Order Book mạnh mẽ trong nhiều khía cạnh, nó cung cấp nhiều khả năng và lựa chọn cho người dùng.

#### Nhược điểm

- **Yêu cầu liquidity cao**: Một DEX có liquidity thấp sẽ khiến Order Book trở nên không hiệu quả và tác động xấu dến trải nghiệm người dùng.
- **Dễ bị thao túng**: Order Book thường được lạm dụng để cung cấp những manh mối sai lệch nhằm thao túng thị trường.
  Những hành vi thao túng này có thể dễ dàng bị truy vết và trừng phạt trên các CEX, nhưng lại không thể trên các DEX.
