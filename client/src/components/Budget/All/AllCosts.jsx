import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import * as categoriesService from '../../../services/categories';
import * as costsService from '../../../services/costs';
import { styleNames } from '../../../utils/constants/global';
import { category } from '../../../utils/constants/model';
import { toggleWithTargetContent } from '../../../utils/helpers/dropdown';
import { cancelForm } from '../../../utils/helpers/form';

import AddButton from '../../shared/Buttons/Add/AddButton';
import CreateCost from '../Create/CreateCost';
import SingleCost from '../Single/SingleCost';
import UpdateCost from '../Update/UpdateCost';

import styles from './AllCosts.module.css';

function AllCosts() {
    //todo check all files with css
    //todo check all files with files tasks
    //todo test again!!!!

    //todo add css classes to categorories images
    //todo calculate budget/actual costs
    
    const { id: plannerId } = useParams();
    const [categories, setCategories] = useState([]);
    const [costs, setCosts] = useState([]);
    const [costId, setCostId] = useState('');
    const [currentIndex, setCurrentIndex] = useState('');
    const costsAllRef = useRef(null);

    useEffect(() => {
        categoriesService
            .all()
            .then((res) => {
                res = res.filter((el) => el.id !== category.DEFAULT_CATEGORY_SELECTED_ID);
                setCategories(res);
                costsAllRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            })
            .catch((err) => console.error(err));
    }, []);

    useEffect(() => {
        loadCosts();
    }, []);

    const onShowContent = (e) => {
        const targetIcon = e.target
        const targetElement = targetIcon.parentElement.nextSibling;
        toggleWithTargetContent(targetElement, targetIcon);
    }

    const onCancelFormHandler = (e) => {
        cancelForm(e.target);
        setCostId('');
        setCurrentIndex('');
    }

    const onShowFormHandler = (e) => {
        const targetFormElement = e.target.parentElement.parentElement.children[0];
        targetFormElement.style.display = styleNames.FLEX;
    }

    const loadCosts = () => {
        costsService
            .all(plannerId)
            .then((res) => setCosts(res))
            .catch((err) => console.error(err));
    }

    const onDeleteHandler = (id) => {
        costsService
            .deleteById(id)
            .then(() => {
                loadCosts();
            })
            .catch((err) => console.error(err));
    }

    const onEditHandler = (id, index) => {
        setCostId(id);
        setCurrentIndex(index);
    }

    return (
        <section ref={costsAllRef} className="section-planner section-background">
            <div className="section-title-wrapper">
                <h2 className="section-title">Budget</h2>
            </div>
            <div className={styles["budget-info-wrapper"]}>
                <p className="budget-info-target">
                    <span className="budget-info-target-name">Budget:</span>
                </p>
                <p className="budget-info-actual">
                    <span className="budget-info-actual-name">Actual total:</span>
                </p>
            </div>
            <div className={styles["budget-main-content-wrapper"]}>
                {categories.map((c, index) =>
                    <div key={c.id} className={styles["budget-main-current-category-wrapper"]}>
                        <div className={styles["budget-main-current-category-info-wrapper"]}>
                            <i onClick={onShowContent} className="fa-solid fa-chevron-down"></i>
                            <div className={styles["budget-main-current-category-info"]}>
                                <img className={styles["budget-main-current-category-info-image"]} src={c.image} alt={c.name} />
                                <span className={styles["budget-main-current-category-info-name"]}>
                                    {c.name}
                                </span>
                            </div>
                        </div>
                        <div className={styles["budget-main-current-category-costs-wrapper"]} style={{ display: styleNames.BLOCK }}>
                            {costId
                                && index === currentIndex
                                && <UpdateCost
                                    plannerId={plannerId}
                                    costId={costId}
                                    loadCosts={loadCosts}
                                    onCancelFormHandler={onCancelFormHandler}
                                />
                            }
                            {!costId &&
                                <CreateCost
                                    plannerId={plannerId}
                                    category={c.id}
                                    loadCosts={loadCosts}
                                    onCancelFormHandler={onCancelFormHandler}
                                />
                            }
                            <div className={styles["budget-main-current-category-costs-titles-wrapper"]}>
                                <p className="budget-main-current-category-costs-titles-title">Title</p>
                                <p className="budget-main-current-category-costs-titles-cost">Actual cost</p>
                            </div>
                            {costs.filter((cost) => cost.category === c.id).length > 0
                                ? costs
                                    .filter((cost) => cost.category === c.id)
                                    .map((cost) =>
                                        <SingleCost
                                            key={cost.id}
                                            index={index}
                                            costId={costId}
                                            id={cost.id}
                                            title={cost.title}
                                            price={cost.price}
                                            onEditHandler={onEditHandler}
                                            onDeleteHandler={onDeleteHandler}
                                        />
                                    )
                                : <p className={styles["budget-main-current-category-costs-empty"]}>No costs yet</p>
                            }
                            {!costId
                                && <AddButton
                                    classNames={[]}
                                    text={'cost'}
                                    isEmptyString={false}
                                    onShowFormHandler={onShowFormHandler}
                                />
                            }
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

export default AllCosts;