import { classNames, styleNames } from "../constants/global";

export const toggle = (element, remove, add) => {
    element.classList.remove(remove);
    element.classList.add(add);
}

export const toggleWithTargetContent = (targetElement, targetIcon) => {
    targetElement.style.display === styleNames.NONE
        ? targetElement.style.display = styleNames.BLOCK
        : targetElement.style.display = styleNames.NONE;

    if (targetIcon.classList.contains(classNames.CHEVRON_DOWN)) {
        targetIcon.classList.remove(classNames.CHEVRON_DOWN);
        targetIcon.classList.add(classNames.CHEVRON_RIGHT);
    } else {
        targetIcon.classList.remove(classNames.CHEVRON_RIGHT);
        targetIcon.classList.add(classNames.CHEVRON_DOWN);
    }
}