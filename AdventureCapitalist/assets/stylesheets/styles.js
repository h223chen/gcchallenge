import buttonStyles from './button'

const devTest = {
    borderColor: 'red',
    borderWidth: 3
}

const buttonDev = {
    ...buttonStyles.button,
    borderColor: 'red'
}

const styles = {
    ...buttonStyles,
    buttonDev: buttonDev
};

export default styles;