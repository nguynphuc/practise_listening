# Listening Studio

Website luyện Listening giữa kỳ bằng tiếng Việt, chạy hoàn toàn phía trình duyệt. Đã kèm **4 đề mới, 80 câu, 8 file MP3 riêng**; không cần API key, tài khoản hay backend.

## Mở để kiểm tra

Mở trực tiếp `index.html` bằng Edge hoặc Chrome. Để kiểm tra giống khi lên mạng, mở terminal trong thư mục này và chạy:

```powershell
python -m http.server 8080 --bind 127.0.0.1
```

Truy cập **http://localhost:8080**. Hoặc chạy `npm start` nếu có Node.js và Python. Không cần `npm install` để sử dụng website.

## Quy tắc bài thi

- **Part 1:** 10 câu × 0,5 = 5 điểm. Điền 1–3 từ hoặc số. Từ có gạch nối tính là một từ. Phân biệt spelling, gạch nối và giới từ; không phân biệt hoa/thường; bỏ dấu câu cuối câu. Biến thể số hợp lệ được khai báo cụ thể trong đáp án.
- Phải **xác nhận hoàn thành Part 1** trước khi mở Part 2. Khi đã xác nhận, không sửa Part 1 được nữa. Có cảnh báo câu trống hoặc vượt giới hạn; vẫn được chủ động nộp.
- **Part 2:** 10 câu × 0,5 = 5 điểm. Mỗi câu có 2 nhóm ý, mỗi nhóm 0,25. Nhận các từ đồng nghĩa/viết tắt đã khai báo trong rubric; không yêu cầu trùng nguyên văn.
- Nộp Part 2 mới mở điểm, đáp án, tiêu chí, audio và transcript cả hai phần. Transcript không xuất hiện trong giao diện trước khi nộp.
- Có thể nghe lại audio trong khi làm. Không áp đặt giới hạn thời gian hay số lần nghe vì yêu cầu ban đầu chưa quy định.
- Bài và kết quả lưu trong `localStorage` trên thiết bị/trình duyệt hiện tại. Làm lại một đề sẽ xóa lượt đang lưu của đề đó sau khi xác nhận. Không đồng bộ giữa thiết bị.

## Phạm vi và tiến độ

Dựa trên 8 chapter đầu của **Listening and Notetaking Skills 2, 4th edition**, Phyllis L. Lim & William Smalzer, National Geographic Learning. Hiểu “8 topic” là 8 chapter đầu, vì sách có 5 unit lớn.

| Đề | Chapter | Trọng tâm | Audio |
| --- | --- | --- | --- |
| 01 | The Population; Immigration | Thông tin trực tiếp, số, ghi ý cơ bản | Aria, US, -12% |
| 02 | Work in America; Family in the United States | Sửa thông tin, quan hệ hỗ trợ trong gia đình | Guy, US, -5% |
| 03 | Religion; Birth, Marriage, and Death | Đối chiếu, chức năng, giới hạn dữ liệu | Sonia, UK, 0% |
| 04 | Multiculturalism; Two Views on Crime | Distractors, quan hệ nhân quả, tổng hợp góc nhìn | Andrew, US, +7% |

Mỗi đề có bẫy **spelling, compound adjectives, numbers, decades và in/on/at** ở Part 1. Độ khó tăng cả tốc độ, mật độ thông tin và mức suy luận. Đây là lộ trình luyện tập, chưa được hiệu chuẩn bằng thử nghiệm người học. 4 đề kết hợp bao phủ 8 topic; mỗi đề tập trung một cặp topic, không phải cả 8 topic trong từng đề.

Mục lục đối chiếu: [Julien Couture Resource Centre, ISBN 9781133950608](https://ilob-olbi.juliencouturecentre.ca/cgi-bin/koha/opac-detail.pl?biblionumber=885). Trang sách chính thức: [National Geographic Learning](https://www.eltngl.com/sites/listeningandnotetaking/student-resources/level-2).

Toàn bộ câu hỏi và transcript được soạn mới theo phạm vi chủ đề. Tình huống, nhân vật và số liệu là giả định. MP3 là giọng tổng hợp tạo riêng từ transcript, không sao chép audio hoặc bài tập gốc, không phải đề chính thức và không liên kết với nhà xuất bản.

## Giới hạn chấm linh hoạt

Part 2 là **bộ chấm cục bộ theo nhóm ý và danh sách từ đồng nghĩa**, không gọi AI. Bộ chấm có thể bỏ sót paraphrase chưa khai báo và có thể cho điểm sai khi từ khóa xuất hiện trong câu mâu thuẫn, câu sai quan hệ hoặc một danh sách từ rời rạc. Từ phủ định được đánh dấu cần kiểm tra và mặc định chưa cho điểm tự động. Đối chiếu transcript/rubric và chọn điểm tự đối chiếu 0 / 0,25 / 0,5; có thể trở về điểm tự động. Điểm tự điều chỉnh luôn được ghi nhãn.

Website phù hợp **tự luyện**, không phù hợp thi bảo mật: do chạy tĩnh, người dùng có thể xem đáp án/transcript trong mã nguồn hoặc tải audio trước khi nộp. Khi phát triển thành thi thật cần backend, phân quyền và người chấm hoặc dịch vụ chấm ngữ nghĩa. Không cần các thành phần đó để chạy bản tự luyện này.

## Đưa lên GitHub Pages sau khi duyệt

1. Tạo repository và tải **nội dung bên trong** thư mục này lên root của repository; nhớ bao gồm thư mục `audio`.
2. Vào **Settings → Pages → Deploy from a branch**, chọn branch và thư mục root.
3. Dùng đường dẫn Pages được GitHub cung cấp. Các đường dẫn tài nguyên đều tương đối nên dùng được trong project Pages.

Hiện chỉ tạo bản cục bộ; chưa tạo repository hay công bố website. Quy trình Pages có thể thay đổi; xem [tài liệu GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Chỉnh đề và tạo lại audio

- `data.js`: transcript, câu hỏi, đáp án, nhóm ý, giọng đọc và tốc độ.
- `grading.js`: logic chấm. `app.js`: luồng, giao diện, lưu bài. `styles.css`: giao diện responsive.
- `audio/`: MP3 đi kèm; người học chỉ cần những file này, không cần dịch vụ TTS khi sử dụng.

Khi đổi transcript, tạo lại MP3 tương ứng. Công cụ tạo audio cần internet, Node.js và Python:

```powershell
python -m pip install -r requirements-audio.txt
python scripts/generate_audio.py --force
```

Không dùng `--force` sẽ giữ các file audio đã tồn tại. Công cụ dùng `edge-tts` để gọi dịch vụ giọng nói, nên việc tạo lại phụ thuộc dịch vụ bên ngoài. Việc nghe MP3 đã tạo không phụ thuộc dịch vụ này. Font Google có fallback hệ thống khi mất mạng.

## Kiểm tra

```powershell
npm test
```

Kiểm tra cấu trúc 4 đề, thang điểm tối đa, giới hạn từ, spelling, gạch nối, distractors số, từ đồng nghĩa, điểm từng phần và phát hiện phủ định. Test giao diện và audio có hướng dẫn trong `tests/QA.md`.
