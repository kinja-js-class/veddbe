APP.directive('adminForm', (patientFctry) => {

	let link = (scope, element, attrs, controller) => {
		element.bind('keypress', function () {
			controller.checkComplete();
		});
	},

	controller = function () {
		let checkComplete, saveData, _isComplete;

		checkComplete = () => {
			console.log(this.isComplete);
			this.isComplete = _isComplete();
		};

		saveData = () => {
			let body = Object.assign({}, this.treatment);

			delete body.patient;

			patientFctry.save(this.treatment.patient, body);
			this.treatment = {};
		};

		_isComplete = () => {
			let treatment = this.treatment;
			if ((Object.keys(treatment).length) === 3) {
				return Object.keys(treatment).every (el => treatment[el] !== '');
			} else {
				return false;
			}
		};

		this.treatment = {};
		this.saveData = saveData;
		this.checkComplete = checkComplete;
		this.isComplete = false;
	};

	return {
		restrict: 'A',
		controller: controller,
		controllerAs: 'admin',
		link: link
	};
});
