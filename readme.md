
1. Create Acccount
  => firstName, lastName, email, password

2. After creating an account an email is sent to the user (Thank you for Creating account);
  => in mail he will be sent will all the fields including password
  => password is a combination of fewWords(firstname + lastname + mobile)
  => The characters picked will be random everytime in the password

3. Login Page
  => firstName and password both we need to check with our database. 
  If it matches then only user can login into their account. If not, he/she cannot log in.

4. He will be navigated to the another page where will be show a form where all the fields are fields are prefilled except bio and also he needs to add profilePicture as well. 
  => open popup where we will limit the bio for 500characters => save it will be saved

5. below the bio we have a video  section and there will be another cta button add video
  => when he click on add video a popup will open and in that he will be prompted to add the videos
  => .mp4 format only and no links size limit is 6mb
  => fields are title(30chars) desc(120chars) and video
  => save it will be saved

6. All users page
  => here we will show all users with his respective profilePicture and his username 
  => so below that we will show his 5 videos there thats it and we will be having one view all button. so once we go to that page then we will show all the videos there
  => url consists of his username 



Packages im gonna use -> 
  Backend => express, mongoose, jsonwebtoken, bcryptjs, multer, nodemailer, dotenv
