import React, {useState} from "react";
import { Grid, Text, Image } from "../elements";
// import { useSelector } from "react-redux";
import 'moment/locale/ko';
// const [layout, setLayout] = useState(_post ? _post.layout : "bottom");


const Card = (props) => {
    const [timer, setTimer] = useState("00:00:00");

    const currentTimer = () => {
      const date = new Date();
      // const hours = String(date.getHours()).padStart(2, "0");
      // const minutes = String(date.getMinutes()).padStart(2, "0");
      // const seconds = String(date.getSeconds()).padStart(2, "0");
      setTimer(`${date}`)
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
  //       setLayout(e.target.value);
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
            //   layout === "left" ? { color: "#1B9CFC", margin: "10px" } : null
            // }
          >
            이보시개... 밥운 먹었눙가아아??
          </strong>
        </label>
        <label htmlFor="right">
          <strong>
          <h1>{timer}</h1>
          </strong>
        </label>
      </Grid>
      <Grid is_flex>
        <Image
          half
          shape="big_square"
          // src={image}
        />
        
        <Text width="55%" margin="60px" center>
        
         

        </Text>
      </Grid>
      
     
  </React.Fragment>
  )
};



export default Card;
