export default () => ({
	conditions: [{
		name: 'new condition',
		id: new Date().getTime() + 10,
		updatedTime: new Date().getTime(),
		criteria: [
			{
				id: new Date().getTime() + 1,
				type: "header",
				key: "",
				check: "2",
				value: "",
				response: new Date().getTime() + 1
			}, 
			{
				id: new Date().getTime() + 2,
				type: "header",
				key: "",
				check: "1",
				value: "",
				response: new Date().getTime() + 2
			},
			{
				id: new Date().getTime() + 3,
				type: "header",
				key: "",
				check: "3",
				value: "",
				response: new Date().getTime() + 3
			},
			{
				id: new Date().getTime() + 4,
				type: "header",
				key: "",
				check: "1",
				value: "",
				response: new Date().getTime() + 4
			},
			{
				id: new Date().getTime() + 5,
				type: "header",
				key: "",
				check: "2",
				value: "",
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