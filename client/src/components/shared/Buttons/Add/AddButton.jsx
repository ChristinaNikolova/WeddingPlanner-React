function AddButton({ classNames, text, isEmptyString, onShowFormHandler }) {
    const getStyles = () => {
        return [...classNames, 'form-icon-wrapper'].join(' ');
    }

    return (
        <div className={getStyles()}>
            <i onClick={isEmptyString ? () => onShowFormHandler('') : onShowFormHandler} className="fa-solid fa-plus"></i>
            Add {text}
        </div>
    );
}

export default AddButton;