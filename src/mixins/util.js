
export default {

    methods: {

        // Method for removing object properties      
        removeObjectProperties: function (obj, props) {
              props.forEach(e => delete obj[e]);
        }
    },
};

