//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

var mongoose = require("mongoose");
var User = require('../app/models/user');

//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();


chai.use(chaiHttp);

//Our parent block
describe('Users', () => {

	// describe('/GET user', () => {
	// 	it('it should GET all the users', (done) => {
	// 		chai.request(server)
	// 			.get('/users/1')
	// 			.end((err, res) => {
	// 				res.should.have.status(200);
	// 				done();
	// 			});
	// 	});
	// });
	beforeEach((done) => { //Before each test we empty the database
		User.remove({}, (err) => {
			done();
		});
	});
	/*
	 * Test the /GET route
	 */
	describe('/GET user', () => {
		it('it should GET all the users', (done) => {
			chai.request(server)
				.get('/user')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('array');
					res.body.length.should.be.eql(0);
					done();
				});
		});
	});
	/*
	 * Test the /POST route
	 */
	describe('/POST user', () => {
		it('it should not POST a user without pages field', (done) => {
			var user = {
				username: "navjot",
				email: "navjot@gmail.com"
			};
			chai.request(server)
				.post('/user')
				.send(user)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					done();
				});
		});
		it('it should POST a user ', (done) => {
			var user = {
				username: "navjot",
				email: "navjot@gmail.com"
			};
			chai.request(server)
				.post('/user')
				.send(user)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('message').eql('User successfully added!');
					res.body.user.should.have.property('username');
					res.body.user.should.have.property('email');
					done();
				});
		});
	});
	/*
	 * Test the /GET/:id route
	 */
	describe('/GET/:id user', () => {
		it('it should GET a user by the given id', (done) => {
			var user = new User({
				username: "navjot",
				email: "navjot@gmail.com"
			});
			user.save((err, user) => {
				chai.request(server)
					.get('/user/' + user.id)
					.send(user)
					.end((err, res) => {
						res.should.have.status(200);
						res.body.should.be.a('object');
						res.body.should.have.property('username');
						res.body.should.have.property('email');
						res.body.should.have.property('_id').eql(user.id);
						done();
					});
			});

		});
	});
	/*
	 * Test the /PUT/:id route
	 */
	describe('/PUT/:id user', () => {
		it('it should UPDATE a user given the id', (done) => {
			var user = new User({
				username: "navjot",
				email: "navjot@gmail.com"
			})
			user.save((err, user) => {
				chai.request(server)
					.put('/user/' + user.id)
					.send({
						username: "navjot",
						email: "navjot@gmail.com"
					})
					.end((err, res) => {
						res.should.have.status(200);
						res.body.should.be.a('object');
						res.body.should.have.property('message').eql('User updated!');
						res.body.user.should.have.property('username').eql('navjot');
						done();
					});
			});
		});
	});
});
