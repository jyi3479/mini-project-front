import React, {useState} from "react";
import { Grid, Text, Image } from "../elements";
// import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';
import 'moment/locale/ko';
import { CommentList } from ".";

const Card = (props) => {
    const [timer, setTimer] = useState("00:00:00");

    const currentTimer = () => {
      const date = new Date();
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");
      setTimer(`${hours}:${minutes}:${seconds}`)
    }
      const startTimer = () => {
        setInterval(currentTimer, 1000)
      }
 
      startTimer()


  // const is_login = useSelector((state) => state.user.is_login);
  // const preview = useSelector((state) => state.image.preview);
  // const post_list = useSelector((state) => state.post.list);

  // useEffect(() => {
  //   const is_checked = (e) => {
  //     if (e.target.checked) {
  //       // setLayout(e.target.value);
  //     }
  //   };
  // }
  // )

  return (
  <React.Fragment>
    <Grid padding="16px">
        <input
          type="radio"
          name="layout"
          value="left"
          id="left"
          // onChange={is_checked}
        />
        <label htmlFor="left">
          <strong
            // style={
            //   // layout === "left" ? { color: "#1B9CFC", margin: "10px" } : null
            // }
          >
            이보시개... 밥운 먹었눙가아아??
          </strong>
        </label>
      </Grid>
      <Grid is_flex>
        <Image
          half
          shape="big_square"
          // src={
          //   // preview
          //   //   ? preview
          //     : "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbKtVzu%2Fbtrs71jQHpa%2FuBis0DOrajBQEJMSBeyZY0%2Fimg.jpg"
          // }
        />
        <Text width="80%" margin="10px" center>
         <h1>{timer}</h1>
         <div className="Title" style={{fontSize:"20px", padding:"16px"}}>
           제목: 멍멍이  닉네임(nickname): sojh
         </div>
         <div className="Location" style={{fontSize:"20px", padding:"16px"}}>
            나라(country)/도시(city): 대한민국/서울 우리집 안방
         </div>
         <div className="Evaluation" style={{fontSize:"20px", padding:"16px"}}>
            평가: 5점/5점
         </div>
         <div className="Review" style={{fontSize:"20px", padding:"16px"}}>
           후기: 밥달라고 한다....
         </div>

        </Text>
      </Grid>
      <CommentList>
        
      </CommentList>

  </React.Fragment>
  )
};



export default Card;
