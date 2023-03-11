module.exports = [
    {
        type: 'object',
        properties: {
            props: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        propName: {
                            type: 'string'
                        },
                        components: {
                            type: 'array',
                            items: {
                                anyOf: [
                                    { type: 'string' },
                                    {
                                        type: 'object',
                                        properties: {
                                            component: { type: 'string' },
                                            dependOn: { type: 'string' }
                                        },
                                        additionalProperties: false
                                    }
                                ]
                            }
                        }
                    },
                    additionalProperties: false,
                    required: ['propName', 'components']
                }
            }
        },
        additionalProperties: false,
        required: ['props']
    }
];
