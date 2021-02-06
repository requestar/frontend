export class ArrayUtils {
	static insertValue(arr, value, index){
		arr.splice(index, 0, value);
		return arr;
	}
	
	/** Removes the all occurance of the value
	 * Use it when u want to delete non unique values
	 */
	static removeMultipleValue(arr, value){
		return arr.filter(function (ele) { 
			return ele !== value; 
		}); 
	}

	/** Removes the first occurance of the value
	 * Use it when u want to delete unique values
	 */
	static removeValue(arr, value) {
		const index = arr.indexOf(value);
		if (index > -1) {
			arr.splice(index, 1);
		}
		return arr;
	}

	static removeIndex(arr, index){
		if (index > -1) {
			arr.splice(index, 1);
		}
		return arr;
	}

	static getSpecificObject(arr, keyName, value){
		return arr.find(object => object[keyName] === value);
	}
}