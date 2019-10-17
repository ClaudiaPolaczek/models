<template>
    <div>
        <h1>Contacts ()</h1>


        <table class="table table-bordered table-hover">

            <thead>

            <tr>

                <th>#</th>

                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th> Address </th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="contact in photographers">

                <th>{ { contact.id } }</th>

                <th>{ { contact.first_name } }</th>

                <td>{ { contact.last_name } }</td>

                <td>{ { contact.email } } </td>

                <td>{ { contact.phone } }</td>


                <td>{ { contact.address } }</td>

                <td>


                </td>
                <el-button @click="deleteContact(contact)">Button</el-button>
            </tr>
            </tbody>
        </table>
        <div>
        </div>
    </div>

</template>

<script>
    import {APIService} from '../APIService';
    const API_URL = 'http://localhost:8080';
    const apiService = new APIService();
    export default {
        mounted() {
            this.getPhotographers();
        },
        name: 'Profiles',
        components: {
        },
        data() {
            return {
                photographers: [],
                numberOfPhotographers:0,
                form: {
                    city: '',
                    region: '',
                    gender: '',
                    age: '',
                    options: [{
                        value: 'dolnoslaskie',
                        label: 'dolnośląskie'
                    }, {
                        value: 'kujawsko-pomorskie',
                        label: 'kujawsko-pomorskie'
                    }, {
                        value: 'lubelskie',
                        label: 'lubelskie'
                    }, {
                        value: 'lubuskie',
                        label: 'lubuskie'
                    }, {
                        value: 'łódzkie',
                        label: 'łódzkie'
                    }, {
                        value: 'małopolskie',
                        label: 'małopolskie'
                    }, {
                        value: 'mazowieckie',
                        label: 'mazowieckie'
                    }, {
                        value: 'opolskie',
                        label: 'opolskie'
                    }, {
                        value: 'podkarpackie',
                        label: 'podkarpackie'
                    }, {
                        value: 'podlaskie',
                        label: 'podlaskie'
                    }, {
                        value: 'pomorskie',
                        label: 'pomorskie'
                    }, {
                        value: 'śląskie',
                        label: 'śląskie'
                    }, {
                        value: 'świętokrzyskie',
                        label: 'świętokrzyskie'
                    }, {
                        value: 'warmińsko-mazurskie',
                        label: 'warmińsko-mazurskie'
                    }, {
                        value: 'wielkopolskie',
                        label: 'wielkopolskie'
                    }, {
                        value: 'zachodniopomorskie',
                        label: 'zachodniopomorskie'
                    }],
                },
                url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                tableData: [{
                    date: '23',
                    name: 'Jan',
                    surname: 'Kowalski',
                    city: 'Gliwice',
                    address: 'slaskie',
                }, {
                    date: '23',
                    name: 'Jan',
                    surname: 'Kowalski',
                    city: 'Gliwice',
                    address: 'slaskie',
                }]
            }
        },
        methods: {
            getPhotographers(){
                apiService.getPhotographers().then((data) => {
                    this.photographers = data.data;
                    this.numberOfPhotographers= data.count;
                });
            },
            accept() {
                console.log('click');
            },
            cancel() {
                console.log('click');
            },
            filter() {
                console.log('submit!');
            }
        }
    }
</script>

<style scoped>

</style>
