import { styleNames, tagNames } from '../../../utils/constants/global';

import styles from './SingleCost.module.css';

function SingleCost({
    index,
    costId,
    id,
    title,
    price,
    onEditHandler,
    onDeleteHandler
}) {
    const onMouseEnterHandler = (e) => {
        if (e.target.nodeName !== tagNames.P) {
            return;
        }

        e.target.children[0].style.display = styleNames.INLINE_BLOCK;
    }

    const onMouseLeaveHandler = () => {
        Array.from(document.getElementsByClassName('budget-main-current-category-current-cost-icons')).forEach((el) => {
            el.style.display = styleNames.NONE;
        });
    }

    return (
        <div className={styles["budget-main-current-category-current-cost-wrapper"]}>
            <p
                onMouseEnter={onMouseEnterHandler}
                onMouseLeave={onMouseLeaveHandler}
                className={styles["budget-main-current-category-current-cost-title"]}>
                {title}
                <span className="budget-main-current-category-current-cost-icons" style={{ display: styleNames.NONE }}>
                    {!costId && <i onClick={() => onEditHandler(id, index)} className="fa-solid fa-pen"></i>}
                    <i onClick={() => onDeleteHandler(id)} className="fa-solid fa-trash"></i>
                </span>
            </p>
            <p className={styles["budget-main-current-category-current-cost-price"]}>
                <span className={styles["budget-main-current-category-current-cost-price-unit"]}>$</span>
                {price}
            </p>
        </div>
    );
}

export default SingleCost;