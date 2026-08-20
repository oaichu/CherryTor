# 🌸 Về CherryTor (About CherryTor)

> *"Internet được xây dựng dựa trên sự tự do thông tin và quyền riêng tư của mỗi cá nhân. CherryTor ra đời để bảo tồn những giá trị đó."*

---

## 🎯 Sứ Mệnh & Triết Lý Thiết Kế (Mission & Philosophy)

Hầu hết các công cụ tìm kiếm torrent hiện nay đều chứa đầy quảng cáo phiền toái, các trình theo dõi ẩn (trackers), mã độc popup và ghi lại địa chỉ IP của người dùng. 

**CherryTor** được phát triển nhằm mang lại trải nghiệm hoàn toàn khác biệt:
1. **Sạch sẽ & Tối giản (Clean & Minimal)**: Giao diện dòng lệnh tương tác hiện đại, trực quan, không quảng cáo, không pop-up, tải nhanh dưới 15 mili-giây.
2. **Quyền riêng tư tuyệt đối (Privacy First)**: Không có cơ sở dữ liệu lưu lịch sử tìm kiếm, không lưu địa chỉ IP. Mọi tương tác chỉ tồn tại trong bộ nhớ RAM của Cloudflare Edge và biến mất ngay sau khi hoàn thành.
3. **Phân tán & Đa dạng (Decentralized & Multi-Source)**: Không phụ thuộc vào một máy chủ duy nhất. CherryTor tổng hợp dữ liệu thời gian thực từ 15+ nhà cung cấp lớn nhất toàn cầu.
4. **Hỗ trợ Châu Á & Toàn cầu (Asian & Global Media)**: Hỗ trợ tìm kiếm phim ảnh, anime, drama, nhạc lossless bằng tiếng Việt, tiếng Anh, tiếng Trung, tiếng Nhật, tiếng Hàn và tiếng Indonesia.

---

## 🛠️ Công Nghệ Nền Tảng (Tech Stack)

CherryTor được thiết kế với tiêu chuẩn kỹ thuật khắt khe:

- **Serverless Edge Runtime**: [Cloudflare Workers](https://workers.cloudflare.com/) (Chạy trên hàng trăm datacenter của Cloudflare trên toàn thế giới).
- **Core Engine**: TypeScript 5.x Strict Mode, tuân thủ nguyên tắc Clean Architecture.
- **Frontend**: Lightweight Zero-Dependency Vanilla JS & CSS Tokens, thời gian tải trang < 50ms, độ phản hồi tức thì.
- **Parsing Pipeline**:
  - `xml-adapter.ts`: Bộ giải mã XML/RSS 2.0 streaming an toàn, hỗ trợ CDATA, Base32 InfoHash.
  - `classifier.ts`: Bộ nhận diện chuyên mục thông minh theo thời gian thực.
  - `ranking.ts`: Thuật toán chấm điểm và xếp hạng dựa trên độ sẵn sàng (Seeders/Leechers) và độ hoàn thiện dữ liệu.

---

## 🛡️ Tuyên Ngôn Quyền Riêng Tư (Privacy Manifesto)

- **Không Logs**: Chúng tôi không vận hành bất kỳ máy chủ log nào để theo dõi người dùng.
- **Không Cookie theo dõi**: CherryTor không đặt bất kỳ tracking cookies hay analytics bên thứ ba (Google Analytics, Facebook Pixel, v.v.).
- **Dữ liệu của bạn thuộc về bạn**: Toàn bộ đánh dấu (Bookmarks), tùy chọn ngôn ngữ, giao diện Tối/Sáng được lưu trực tiếp trên thiết bị của bạn (`LocalStorage`). Bạn có thể xóa hoặc xuất ra file JSON bất cứ lúc nào trong bảng Cài Đặt.

---

## 👥 Đóng Góp & Cộng Đồng

CherryTor là dự án mã nguồn mở được phát triển bởi cộng đồng vì cộng đồng. Nếu bạn có ý tưởng cải tiến hoặc muốn bổ sung nguồn tìm kiếm mới, hãy tham gia đóng góp trên [GitHub Repository](https://github.com/oaichu/CherryTor).

---

<p align="center">
  <em>Được tạo với ❤️ và tinh thần tự do mã nguồn mở.</em>
</p>
