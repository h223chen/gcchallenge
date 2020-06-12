import buttonStyles from './buttonStyles'

const disabled = {
	opacity: 0.4
}

/**
 * Master styles object
 * all other styles sheets should be imported here and 
 * consolidated
 */
const styles = {
	...buttonStyles,
	disabled: disabled
};

export default styles;