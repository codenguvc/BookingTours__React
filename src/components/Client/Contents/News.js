import React, { useEffect, useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { getDatabase, ref, get } from 'firebase/database';
import { app } from '../../../firebase/firebase';

const AboutUs = () => {
    const breadcrumb = `${process.env.PUBLIC_URL}/assets/Client/img/breadcrumb-bg.jpg`;
    const [news, setNews] = useState([]);
    const [recentNews, setRecentNews] = useState([]);
    const [expandedNews, setExpandedNews] = useState({});

    useEffect(() => {
        const fetchNews = async () => {
            const db = getDatabase(app);
            const newsRef = ref(db, 'news');
            try {
                const snapshot = await get(newsRef);
                if (snapshot.exists()) {
                    setNews(Object.entries(snapshot.val()).map(([id, news]) => ({
                        id,
                        ...news,
                    })));
                    // Set all news
                } else {
                    console.log('No data available');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchNews();
    }, []);

    useEffect(() => {
        if (news.length > 0) {
            const currentDate = new Date();

            const filteredNews = news.filter((newsItem) => new Date(newsItem.date) <= currentDate);
            const sortedNews = filteredNews.sort((a, b) => new Date(b.date) - new Date(a.date));

            setRecentNews(sortedNews.slice(0, 3));
        }
    }, [news]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        return `Ngày ${day} tháng ${month}, ${year}`;
    };

    const truncateText = (text, maxLength) => {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };

    const toggleExpand = (id) => {
        setExpandedNews((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };

    return (
        <div>
            <Header />
            <div>
                <div className="breadcrumb-option set-bg" style={{ backgroundImage: `url(${breadcrumb})` }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 text-center">
                                <div className="breadcrumb__text">
                                    <h1>Tin Tức</h1>
                                    <div className="breadcrumb__links">
                                        <a href="/">Trang Chủ</a>
                                        <span>Tin Tức</span>
                                    </div>
                                </div>
                            </div>
</div>
                    </div>
                </div>
                <section className="blog spad">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 col-md-8">
                                {news.length > 0 && (
                                    <>
                                        <div className="blog__item__large">
                                            <div className="blog__item__large__pic">
                                                <img src="/assets/Client/img/blog/blog-large.jpg" alt="Large Blog" />
                                                <div className="tag">Du lịch</div>
                                            </div>
                                            <div className="blog__item__text">
                                                <h4>Đà Lạt</h4>
                                            </div>
                                        </div>
                                        <div className="row">
                                        {news.slice(1).map((item, index) => (
                                                <div className="col-lg-6 col-md-6" key={item.id}>
                                                    <div className="blog__item">
                                                        <div className="blog__item__pic">
                                                            <img
                                                                src={item.img}
                                                                style={{ height: '300px' }}
                                                                alt={`Blog ${index + 1}`}
                                                            />
                                                            <div className="tag">{item.tag || 'Hành Trình'}</div>
                                                        </div>
                                                        <div className="content-container" style={{ marginTop: '20px' }} >
                                                            <span>
                                                                {expandedNews[item.id]
                                                                    ? item.content
                                                                    : truncateText(item.content, 40)}{' '}
                                                                    {item.content.length > 40 && (
                                                                <span
                                                                    style={{
                                                                        color: 'blue',
                                                                        cursor: 'pointer',
marginLeft: '8px', 
                                                                    }}
                                                                    onClick={() => toggleExpand(item.id)}
                                                                >
                                                                    {expandedNews[item.id] ? 'Thu gọn' : 'Xem thêm'}
                                                                </span>
                                                                )}
                                                            </span>
                                                        </div>
                                                        <div className="blog__item__text">
                                                            <p>
                                                                <i className="fa fa-clock-o" /> {formatDate(item.date)}
                                                            </p>
                                                        </div>
                                                        <h4>{item.title}</h4>
                                                    </div>
                                                </div>
                                            ))}
                                            <div className="col-lg-12">
                                                <div className="pagination__number blog__pagination">
                                                    <a href="#">1</a>
                                                    <a href="#">2</a>
                                                    <a href="#">
                                                        Tiếp theo <span className="arrow_right" />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className="col-lg-4 col-md-4">
                                <div className="blog__sidebar">
                                    <div className="blog__sidebar__search">
                                        <h4>Tìm Kiếm</h4>
                                        <form action="#">
                                            <input type="text" placeholder="Tìm kiếm..." />
                                            <button type="submit">Tìm kiếm</button>
                                        </form>
                                    </div>
                                    <div className="blog__sidebar__recent">
                                        <h4>Bài Viết Gần Đây</h4>
                                        {recentNews.map((item) => (
<a href="#" className="blog__sidebar__recent__item" key={item.id}>
                                                <div className="blog__sidebar__recent__item__pic">
                                                    <img
                                                        src={item.img}
                                                        style={{ width: '80px', height: '80px' }}
                                                        alt="Recent"
                                                    />
                                                </div>
                                                <div className="blog__sidebar__recent__item__text">
                                                    <h6>{item.title}</h6>
                                                    <div className="time">
                                                        <i className="fa fa-clock-o" /> {formatDate(item.date)}
                                                    </div>
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                    <div className="blog__sidebar__categories">
                                        <h4>Danh Mục</h4>
                                        <ul>
                                            <li>
                                                <a href="#">Phong Cách Sống</a>
                                            </li>
                                            <li>
                                                <a href="#">Nhiếp Ảnh</a>
                                            </li>
                                            <li>
                                                <a href="#">Công Việc</a>
                                            </li>
                                            <li>
                                                <a href="#">Du Lịch</a>
                                            </li>
                                            <li>
                                                <a href="#">Thể Thao</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="blog__sidebar__comment">
                                        <h4>Bình Luận Gần Đây</h4>
                                        <p>
                                            Tham gia một triển lãm thương mại có thể là một cách hiệu quả để quảng bá
                                            công ty và dịch vụ của bạn
                                        </p>
                                        <span>Giải pháp du lịch bền vững cho năm 2023</span>
<p>
                                            Khi tôi mới bắt đầu lớp 6, tôi có công việc đầu tiên là giao báo. Ôi, tôi đã
                                            rất phấn khích.
                                        </p>
                                        <span>Những địa điểm du lịch phổ biến nhất ở Việt Nam</span>
                                        <p>
                                            Các dịch vụ đặt tour du lịch của chúng tôi luôn là lựa chọn hàng đầu khi bạn
                                            chuẩn bị cho chuyến đi của mình
                                        </p>
                                        <span>Khám phá các điểm đến nổi bật ở Đông Nam Á</span>
                                    </div>
                                    <div className="blog__sidebar__tags">
                                        <h4>Thẻ Phổ Biến</h4>
                                        <a href="#">Sáng Tạo</a>
                                        <a href="#">Độc Đáo</a>
                                        <a href="#">Du Lịch</a>
                                        <a href="#">Nhà Hàng</a>
                                        <a href="#">Mẫu Template</a>
                                        <a href="#">Ý Tưởng</a>
                                        <a href="#">Khách Sạn</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <Footer />
        </div>
    );
};

export default AboutUs;