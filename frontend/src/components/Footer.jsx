import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/images/Logo.jpg'
import Grid from './Grid'
const footerAboutLink = [
  {
    content: 'Giới thiệu',
    path: '/about'
  },
  {
    content: 'Liên hệ',
    path: '/about'
  },
  {
    content: 'Tuyển dụng',
    path: '/about'
  },
  {
    content: 'Tin tức',
    path: '/about'
  },
  {
    content: 'Hệ thống cửa hàng',
    path: '/about'
  }
]
const footerCustomerLink = [
  {
    content: 'Chính sách đổi trả',
    path: '/about'
  },
  {
    content: 'Chính sách bảo hành',
    path: '/about'
  },
  {
    content: 'Chính sách hoàn tiền',
    path: '/about'
  }
]

const Footer = () => {
  return (
    <div className='footer'>
      <div className='container'>
        <Grid col={4} mdCol={2} smCol={1} gap={10}>
          <div>
            <div className='footer__title'>Tổng đài hỗ trợ</div>
            <div className='footer__content'>
              <p>
                Liên hệ dặt hàng <strong>0123456789</strong>
              </p>
              <p>
                Thắc mắc đơn hàng <strong>0123456789</strong>
              </p>
              <p>
                Góp ý ,khiếu nại <strong>0123456789</strong>
              </p>
            </div>
          </div>
          <div>
            <div className='footer__title'>Về chúng tôi</div>
            <div className='footer__content'>
              {footerAboutLink.map((item, index) => (
                <p key={index}>
                  <Link to={item.path}>{item.content}</Link>
                </p>
              ))}
            </div>
          </div>
          <div>
            <div className='footer__title'>Chăm sóc khách hàng</div>
            <div className='footer__content'>
              {footerCustomerLink.map((item, index) => (
                <p key={index}>
                  <Link to={item.path}>{item.content}</Link>
                </p>
              ))}
            </div>
          </div>
          <div className='footer__about'>
            <p>
              <Link to='/'>
                <img src={logo} className='footer__logo' alt='' />
              </Link>
            </p>
            <p>
              Hướng đến mục tiêu mang lại niềm vui ăn mặc mới mỗi ngày cho hàng triệu
              người tiêu dùng Việt. Hãy cùng chúng tôi hướng đên một cuộc sống năng
              động,tích cực hơn
            </p>
          </div>
        </Grid>
      </div>
    </div>
  )
}

export default Footer
