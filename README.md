# Receipt Render

This is the Reciept Render App. Use this app to quickly and easily split up a reciept/bill between multiple people/groups, without needing to type in the line items. Take a picture of the reciept and then load it into the app, when prompted. 

[![Codeship Status for whicke01/Receipt_Render](https://app.codeship.com/projects/4ffea0b0-e7a8-42f8-9a85-d6d2364050da/status?branch=master)](https://app.codeship.com/projects/443354)


**Developed By:** Will Hickey
**Heroku Link:**
**Included Features:** 
**Included Technologies:** Rails server, PostgreSQL database, React JS frontend, Google Vision API


#### Dependencies: 
  * Ruby Version: 2.7.3 
  * Rails Version: 5.2.5 
  * Bundler Version: 2.2.15

#### Getting Started:

After you fork, clone, or download the repo, execute the following commands to run the application locally:

$ `bundle install `
$ `yarn install`

To build the PostgreSQL database:

$ `bundle exec rake db:create` 
$ `bundle exec rake db:migrate` 
$ `bundle exec rake db:seed`

To view the app in development locally at https://localhost:3000/ Run the following commands in separate terminal windows:

$ `rails s` 
$ `yarn start`

#### In Progress Features:

