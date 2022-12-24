// import styles from '/SingleNote.module.css';

function SingleNote() {
    return (
        <h1>single</h1>
        // <div className={styles["guests-all-info-wrapper"]}>
        //     <div className={styles["guests-all-info-left"]}>
        //         <p className={styles["guests-all-role"]}>{role}</p>
        //         <p onMouseEnter={onMouseEnterHandler} onMouseLeave={onMouseLeaveHandler} className={styles["guests-all-name"]}>
        //             {firstName} {lastName}
        //             <span className={styles["guests-all-image"]}>
        //                 {getPersonImage(age, gender)}
        //             </span>
        //             {isHovering &&
        //                 <span className={styles["guests-all-icons"]}>
        //                     {!isEditIconHidden && <i onClick={() => onShowFormHandler(id)} className="fa-solid fa-pen"></i>}
        //                     {role !== 'bride' && role !== 'groom' &&
        //                         <i onClick={() => onDeleteHandler(id)} className="fa-solid fa-trash"></i>
        //                     }
        //                 </span>
        //             }
        //         </p>
        //         <p className={styles["guests-all-side"]}>
        //             <span className={styles["guests-all-info-title"]}>Side:</span>
        //             {side}
        //         </p>
        //     </div>
        //     <div className="guests-all-info-right">
        //         <p className={styles["guests-all-info"]}>
        //             <span className={styles["guests-all-info-title"]}>Table:</span>
        //             {table === '' ? 'no info' : table}
        //         </p>
        //         <p className={styles["guests-all-info"]}>
        //             <span className={styles["guests-all-info-title"]}>Confirmed:</span>
        //             {confirmed
        //                 ? <i className="fa-solid fa-check"></i>
        //                 : <i className="fa-solid fa-xmark"></i>
        //             }
        //         </p>
        //         <p className={styles["guests-all-info"]}>
        //             <span className={styles["guests-all-info-title"]}>Dish:</span>
        //             {mainDish === 'no info'
        //                 ? mainDish
        //                 : getDishImage(mainDish)
        //             }
        //         </p>
        //     </div>
        // </div>
    );
}

export default SingleNote;