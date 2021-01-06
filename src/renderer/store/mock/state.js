export default () => ({
	conditions: [{
		name: 'new condition',// i18n
		id: new Date().getTime(),
		criteria: [
			{
				id: new Date().getTime() + 1,
				type: "header",
				key: "key",
				check: "check",
				value: "value",
				response: new Date().getTime() + 1
			}, {
				id: new Date().getTime() + 2,
				type: "header",
				key: "key",
				check: "check",
				value: "value",
				response: new Date().getTime() + 2
			},
			{
				id: new Date().getTime() + 3,
				type: "header",
				key: "key",
				check: "check",
				value: "value",
				response: new Date().getTime() + 3
			},
			{
				id: new Date().getTime() + 4,
				type: "header",
				key: "key",
				check: "check",
				value: "value",
				response: new Date().getTime() + 4
			},
			{
				id: new Date().getTime() + 5,
				type: "header",
				key: "key",
				check: "check",
				value: "value",
				response: new Date().getTime() + 5
			}
		],
		pattern: (new Date().getTime() + 1) + "&" + (new Date().getTime() + 2) 
			+ "&(" + (new Date().getTime() + 3) + "|" + (new Date().getTime() + 4) + ")|" + (new Date().getTime() + 5),
		response: [
			{
				id: new Date().getTime() + 1,
				status: '200',
				value: ""
			},
			{
				id: new Date().getTime() + 2,
				status: '201',
				value: "elan"
			},
			{
				id: new Date().getTime() + 3,
				status: '200',
				value: ""
			},
			{
				id: new Date().getTime() + 4,
				status: '201',
				value: "elan"
			},
			{
				id: new Date().getTime() + 5,
				status: '200',
				value: ""
			}
		]
	}
	]
})