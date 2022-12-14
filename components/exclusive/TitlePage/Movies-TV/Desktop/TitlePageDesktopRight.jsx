import styled from "styled-components";
import Image from "next/image";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

//Firebase Imports
import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { app, db, auth } from "../../../../../firebase/config";

const TitlePageRightContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-height: 100%;
  width: 50%;
  gap: 1rem;
`;

const CommentSectionContainer = styled.div`
  max-height: 20rem;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Comment = styled.div`
  display: flex;
  color: white;
  font-weight: 400;
  width: 100%;
  gap: 0.5rem;
`;

// review drop down components
const ReviewHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;
const CommentTitle = styled.h5`
  color: white;
  font-size: 1.4rem;
  font-weight: 400;
`;

//review section

const AddReviewContainer = styled.div`
  display: flex;
  color: white;
  align-items: center;
`;
const AccountCircleIconContainer = styled.div`
  padding-right: 0.5rem;
`;
const ReviewTextAndButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1b2b3a;
  border-radius: 10px;
  width: 100%;
`;
const ReviewTextField = styled.textarea`
  border: 1px solid #1b2b3a;
  background-color: #1b2b3a;
  font-family: inherit;
  font-size: 1rem;
  padding: 2px 10px;
  color: var(--font-secondary-color);
  border: none;
  outline: none;
  border-radius: 10px;

  display: block;
  width: 100%;
  overflow: hidden;
  resize: both;
  min-height: 1.2rem;
  line-height: 30px;
`;
const ReviewButton = styled.button`
  border: none;
  outline: none;
  text-decoration: none;
  background-color: #1b2b3a;
  color: white;
  padding: 10px;
  font-weight: bold;
  color: var(--secondary);
`;
const CommentText = styled.p`
  font-size: 1rem;
  /* text-align: justify; */
`;


function TitlePageDesktopRight({movieData, tvData}) {
//STATES
const [userReview, setUserReview] = useState("");
const [fireData, setFireData] = useState([]);

//AUTHENTICATION
 //If you check the console, you can see the details of the user that is currently logged in!
 const signedInUser = auth.currentUser;
 

//INTIAL RENDER
useEffect(() => {

//GET reviews

  if(movieData){
  getDocs(collection(db, `${movieData.title} Reviews`))
    .then((response) => {
      setFireData(
        response.docs.map((data) => {
          return { ...data.data(), id: data.id };
        })
      )
      ;
    })
    .catch((error) => {
      console.log(error);
    });
  }else{
    getDocs(collection(db, `${tvData.name} Reviews`))
    .then((response) => {
      setFireData(
        response.docs.map((data) => {
          return { ...data.data(), id: data.id };
        })
      )
      ;
    })
    .catch((error) => {
      console.log(error);
    });
}
}, [fireData])

//ADD reviews
const addReview = () => {
  if(movieData){
  addDoc(collection(db, `${movieData.title} Reviews`),
    { review: 
      userReview })
      .then(() => {
        setUserReview("");
      });
    }else{
      addDoc(collection(db, `${tvData.name} Reviews`),
    { review: 
      userReview })
      .then(() => {
        setUserReview("");
      });
    }
};

//DELETE reviews
const deleteReview = (id) => {
  if(movieData){
  let fieldToDelete = doc(db, `${movieData.title} Reviews`, id);
  deleteDoc(fieldToDelete)
    .then(() => {
      getReviews();
    })
    .catch((error) => {
      console.log(error);
    });
  }else{
    let fieldToDelete = doc(db, `${tvData.name} Reviews`, id);
  deleteDoc(fieldToDelete)
    .then(() => {
      getReviews();
    })
    .catch((error) => {
      console.log(error);
    });
  }
};


  return (
    <TitlePageRightContainer>
      <ReviewHeaderContainer>
        <CommentTitle>
          Reviews
        </CommentTitle>
      </ReviewHeaderContainer>
      <AddReviewContainer>
        <AccountCircleIconContainer>
          <AccountCircleIcon />
        </AccountCircleIconContainer>
        <ReviewTextAndButtonContainer>
          <ReviewTextField 
          placeholder="Leave a review..."
          type="text"
          value={userReview}
          onChange={(event) => setUserReview(event.target.value)}
          >
          </ReviewTextField>
          <ReviewButton onClick={addReview}>Post</ReviewButton>
        </ReviewTextAndButtonContainer>
      </AddReviewContainer>
      <CommentSectionContainer>
      {fireData.map((data, key) => {
            return (
              <Comment key={key}>
                <AccountCircleIcon />
                <CommentText>{data.review}</CommentText>
                {/* <ReviewButton onClick={() => deleteReview(data.id)}>Remove</ReviewButton> */}
              </Comment>
            );
          })}
      </CommentSectionContainer>
    </TitlePageRightContainer>
  );
}

export default TitlePageDesktopRight;
