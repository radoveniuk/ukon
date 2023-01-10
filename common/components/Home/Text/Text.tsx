import { useState } from 'react';
import classNames from 'classnames';

import styles from 'styles/components/home/Text.module.scss';

export default function Text() {
  const [active, setActive] = useState(false);
  return (
    <section className={classNames(styles.text, active ? styles.active : '')}>
      <div className="container">
        <div className="top">
          <div className="top__left">
            <div className="sub t3">
              КОМПАНИЯ
            </div>
            <h2 className="h2 title">
              Открыть ИП или ООО в Словакии? <br />
              Знаем, умеем, практикуем.
            </h2>
          </div>
        </div>
        <p className={classNames(styles['text-p'], 'body') }>
          Úkon поможет зарегистрировать ваш бизнес и сэкономит при этом ваши время и нервы. Мы подготовим за вас необходимый пакет документов и подадим его в соответствующее ведомство. Также с удовольствием внесем за вас изменения в ИП или ООО.
          <br />
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aspernatur atque deleniti deserunt ducimus eligendi enim, ex expedita inventore, ipsam iure iusto minima molestiae nostrum odio officia possimus quas qui quis repellat sint sit voluptatem. Itaque, nulla repellat? A alias beatae blanditiis consectetur consequuntur deleniti dignissimos dolor ducimus eos esse eum illo iste iure libero maiores maxime minima mollitia pariatur perspiciatis provident sed, sint vero! Consequuntur corporis debitis, dicta doloremque enim ipsa ipsum molestias neque numquam rem repudiandae sapiente temporibus tenetur, totam ut vero, vitae. Aliquam architecto dolore doloribus repellat tempore. Ad deleniti dolorum, enim mollitia numquam possimus quas quo?
        </p>
        <div className="btn-more" onClick={() => void setActive((prev) => !prev)}>
          <svg className="btn-more-prev" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 16L7.5 12H21.5M21.5 12L18 9M21.5 12L18 15" stroke="#44998A" strokeWidth="1.5" strokeLinejoin="round"/>
          </svg>
          <span className="btn-text">
            {active ? 'Свернуть' : 'Развернуть'}
          </span>
          <svg className="btn-more-next" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19M19 12L15.5 9M19 12L15.5 15" stroke="#44998A" strokeWidth="1.5" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </section>
  );
}