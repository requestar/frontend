export class ArrayUtils {
	/** Removes the all occurance of the value
	 * Use it when u want to delete non unique values
	 */
	removeMultipleValue(arr, value){
		return arr.filter(function (ele) { 
			return ele !== value; 
		}); 
	}

	/** Removes the first occurance of the value
	 * Use it when u want to delete unique values
	 */
	removeValue(arr, value) {
		const index = arr.indexOf(5);
		if (index > -1) {
			arr.splice(index, 1);
		}
		return arr;
	}

	removeIndex(arr, index){
		if (index > -1) {
			arr.splice(index, 1);
		}
		return arr;
	}
}