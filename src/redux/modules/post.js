import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { postApis } from "../../shared/api";

// action type
const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";

// action creator
const setPost = createAction(SET_POST, (post_list) => ({ post_list }));
const addPost = createAction(ADD_POST, (post) => ({ post }));

const initialState = {
  list: [
    {
      id: 0,
      nickname: "juyeong",
      title: "부산 여행 후기",
      country: "한국",
      city: "부산",
      evaluation: "아주 좋음",
      image_url:
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYSEhgUFRUYGRgYGRgYGBgYGRkaGBwZGBkZGRoZGBgcIS4mHB4rIRgaJjgmKy8xNTY1GiQ7QDszPy40NTEBDAwMEA8QHxISHzQrISs0NDQ0NDQ0NDY0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NP/AABEIAKgBLAMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAACAwEEBQAGB//EAEMQAAEDAgQDBAgDBgUCBwAAAAEAAhEDIQQSMUEiUWEFcYGRExQyQlKhscEG0fAjYnKCw/EVc5Ky4TOiByRDU2PC0//EABkBAQEBAQEBAAAAAAAAAAAAAAEAAgMEBf/EACMRAAIDAQADAAICAwAAAAAAAAABAhESIRMxQQNhUXEEFDL/2gAMAwEAAhEDEQA/ANIBTCkBFC9pgCFMIoUwqyBhdCKFMJsgYXQihTCrIHKpyooUgKs0BlXZUzKphVkLyrsqblU5VWQrKuypuVTlVZCsq7KmhinKiyFZVMJmVTlVZC8qnKjyog1VkLDVwamhqkMRZC8qIBMyKQ1VkA0KTTB1CMNRhqy+mlJr0V/VRsVLaDhorIajCw4nVfkf0rNadwudhA7ZWgjCHE0vyIyn4IjRNw2ZputMBEGDksNM0vyoW1mYSFIYnsbGyIU0pv6c5U3wQGI8icGIsqmzB5ABTCKFMLvZyoEBTCKFOVNiBCmEcLoVZAwpARZUWVVkAAiAUhqkNVZEAKQEQapARZAhqkNRgIg1VkLhTlTAFMIsheVTlRwphViAGqcqOFIaqyoWGqcqZlRBqLKhQaiDEzKpDUWNCwxTkTA1EGq0NCwxSGpoajDEaKhIajDE0MRhiNFQoMUhisBiIMWXIqEhiNrE0U0FRnGzvd/sKNDRLWIw1NDEYYhyIUGIsqaGIsiy5CeJyqQ1SAiAXfRmgQ1TlRgIgFaCheVSGJoCkNVoqFBiIMTQ1SGq0VCgxFlTQ1TlVosiQxSGJ4auDVaGhIYiypoaiyo0VCcqnInBinIrRUIyIsqcGKfRo0WRORdCa5seY+ZR5FaKhOVcGp2RSGI0NCgxEGJgaiDUaKhYYpDE0NRBiNDQoNRtYmBiINRoqBDEbWIw1E1qzoaBDEbWI2tRtahyKgGsScS7LUpD4nvHlTe77K4AqPaAithb/wDqv+dCqjQovBiIMTA1EAjRkAMRZEYCmFWFngAEQC4FECu2jWTgEQC4FSCrRZOARALgVIKNDkkIgFwUhWiySApAXBSEbHJwCIBQFIRsshAIgEKlGhyEAphQCpBRsskwphQCplGioCuQGyfib55hHzTYWT+IXH0QhxbDnOsY9inUePCWhaxKnMskhqINQhyIOWdjkkNUhq4ORAo2WDg1EGrgUQKNjk4NRBq4FSCrZZOARgKAUQKNBkMBEAhBUhyNBQwLN7WdFTDXj9tHnSqWWgHLN7XdD8MZA/bjX/LqWHVKl0q6bARBACiBWdnNhhShldKtgfPw5EHKqHohUXqpno4Wg5EHKp6RT6RFMaRcDlIcqgqKRVWaY5RcBRBypCspFZFMcovBykOVEV0Xp1mmOUXg9dnVIV0Qrq6OUXA9EHKkK6kV1no5LuZTmVH0yn0yHZYL2ZTnVH0yn06LY4PMfif8TtZWNEU84YC0nMW8TwWuHsmeEkSD7xW/+HO2Ri6IdEObZ7bnnBmBMgcl847Xxj6zy5zWtOYkllzE8pXpfwZjXl1Rpa1rQGxGa5k8zyOy6SVRuunCPZUe5zLsyoesqvjO0fRhv7z2MvtmMT1XFabpHdxSVs2MykPWecSFIxQWbY4NIVEYessYoc0QxQ5otjg0w9EHrL9aHNSMUOaLZYNQVEQqLLGKHNEMUOarZeM1RUUiossYrqp9aRbDxFTt38QPwtWmGsD2OaS4cWazgJaQD80uv29RxPoCx0ObWBcx4LXD9nUG+uouOa8p+P8AtIU61LhzSw/D8XUFeTZ2lvlGsiMoPnlXqh+LUUzzyajKmffvTIxWXy/sr8WvptbncHtIBhxdmHQODL+Mr1uA7cp1vYJndrhDvnr4LhOEo+0ajGMvR6QVeqn0vVZHrSn1pcbZrwM8V6Ycx5rvWG8wvKDGTabG0964YmQROwAnuX3Mo8emer9abzXetN+JeTZiHNawA3kCNyCfoudXcLkkfofnCsotSPWDFs+IKfW2/EvIMr5bSfDkVIxpBInpFjrExIViJbkev9bb8S71tvxfVeUoVMxILy0XuY1S2Yt05b+d5mdfkrER3I9f6234vqgHaLM+TNeJNj9YXlfWf4vNBTxYDybwYBvewH3CHGPwVOX09j643n9VPrjfi+q8rSxTXGMpd3G/lCk17kQbWPEDMciBpKMRHySPU+ut5/IrvXm8/kvLVa+VpccpidDJPLTb8lOGrZ2B/s7bADxKsRLySPUjGt5qDj2jdeKw1QnEvDnQBzMAAco707FYlrGQXzm1JzEjMBIFuZIRiBeWR67/ABBvNVB2+wuIaZAB4tp2AG68nSqF7A2PZ9k7yNEt7iNDyuB4xZT/ABxLzTHYntZzmjgY25JLWPna13FaXZ/bRbndka2QDZrhN2jd2kE+K8+5kiCXTCbSfwviTZouZ95q54iSlJdPU4LtVvpXuLzDgC0EkiNdNAmYvtZj2tDXXDmOiDsQ6/gvJtqSJ6QfCPyUirmNraCZ5ACfkumI3YeWVUe4xPa7GVHNLt3bcjEIB2wz4j/pd9wvGYnEEkEnM6TmO5mHT9U6p2hnc0MkWvpcrPij/BvzyPW/4wzmfIqf8YZ8XyK8/hsU0ua1wEklpJuZgZTHWY8FqOwoizR+u5XigXnmXf8AF2fF8iiHa7Pi+RWY3BHUgHoJ+670Tv8A2j/qZ9leGBeaZqjtdnxKR2uz4llsoNOrXgzsCfGQidhWfv8A+l/1AR4YD5pmg7txgeG3uJnYd6aO1WfEvIY14bUETDe8HXqLeSVVxb3CxIvMyZ1srwQD/YmWfxdi21KjSIMMi4mJcdL2K861xcA0Btz7W88p5JmMcXcTjcCLuE7xY3Pgp7PpyHSNG7kRfe/ctJKPEcpScnbFDDw4BzmwTsTP0W9gO1fRVmObEmR0uIvcfoLGyNaYyjwjS1xH1XOfJtPmqSUlRRbi7R7hn4jdnEublzAEAN0O85zpPyWp/jLOZXzL1lo53srT+12tMEvnoLfVc/BH6dl/kSX0EP8Ad4dBtBnTXfzXcIfl63nURqE9mJY43DtIjUgaa20soxTyGeyQx85SQTprJzGCu+jjkYzIJzONnQZtwjp1nmoeGE2JIkgd0SPPRV3YozbXQcOaYAG5QGs6CcxgQCC3TvjQSfogR1NhdsNQLkiOcSklrpA66+P/AAibiZuZj4W5RbmHQefyVTE14Iyuda5zRMz0TYFyo2G7DYXtYX+yB8l9o2A0jZKYZIBI6iL/AE70RxWQXb7UTB2EEG4v/wAIUrJxosYatAbMbjTW25m+iBguGwTJMG9+SKic3DAuQQCACL5SDyOnktOhQBLWuc0B7OEgiQ4HXv0Hiq6D+zIJGwP6A2THS1s+QBi/P6IX0ixzmPMFsxlMSdiOiHEPeYy73gbzNhzutXwS5hGNe5weQ0EG5J3gSOcawux+FDcK1wcMwdxw4Ehrw2O8DKB/Mqzs7tXHSfsVdxDP/Llz3S4zTGkSBIMeHyXOTbqmbjVO0YFMlrgc0+IvbotZ5FVrcsgkPYZk+yAZho6/JY1cZXlhi3Jo3E6q81xyNDTHE/ofZYLHUK6Y5RcoNzPa1gOYxIgwSJki9tPkkVHsgkF07gERt+a08M85xxHU7nkfzPmsbDYiBfwkfeL3WuouCqpMDUaAnNPNW6LJa8XFgbnk5pSKudo4TM8gOvkn4cmHzBkCzgIPE3osiLLtpBE+B80VR8wI0MRO9kp1IkHiBBMwL/RA1lxNr5ZOgNjc+K2ZCL4/vZWWOaOLTkYB6GyQGtaTJJEmIFrcr3Ch1aH5bRfbv2CmxGvxJa6biDY8u4IKnatX0gio/QAQTv05qtXm1tzECxJHNJquLXNnUAfoKCz0GC7YqU82drnjWXEiD/FyV9/bo9G5waWnLLZIN+o5LzRrF3vEjqbd8FC59jfbTkgUz0FH8TDQjNy4S0z5kK9T7eYKYc8nNFwBqel14luo708OnTTSNDE7oKz1o7Wo1HjM02FnECDzA80frOGd7rRP7sbxtpovJtFyIv0+3khe7K28N6zbqO9JWW/xPRayu0NAALG7kiSXb+SVh2htMkAiSSAbwNAq7qzQRwh9xlJcQRF7X6fNaOLeWsyiIsOf2R9J0UgZsJ3/AFon0aLbTmnTVuX/ALkNd4e68zMSDaI7gNUykxrQSToDo9ot4zJWZPgxXSvXoDLLST3ub9BdZ+LZxm86Ge8A/dXqbc7gz3NbuynmeIwNVn4ykRUcORjnp1Uv2TX8HqMC2m+W1Dl0OYENILSPqCQl0MRDckgiTI1N7Ex0+68zTaSZk6z81tdlU3io0mYIMSImRzIVJjFstdq4em0MNJzoIEETBuQSTub6DSFWrh1OoWuObWbm+W1/9IUYaoWVOLYmB4cuV0dVlOAfSgOkhzT7o6JXoGIeYAgAZgHRtLjxROgVF5OYz5ePyXpcDi6OaXvbDQ7hcbPBgZTI8fPmsv1SnUDycQxpEZWkWcS4TebQJKQEUnyRZog/vE+9zsrDBGZ0RJIAgjhPIjQfkpZgBq14d/CZE98RN+aCvSioRoALiL7d3OFlcZp9RqUqzKdPM9jScxu4SbaXKqUqxNRtQU2yDMXuZJBibQIEdFXL3PZkDcwEvc4wI5EAIWOe0ghp5DWL9e5MuqgXsvdt0hUfmzAWggke6YsdNtllf9My18x8J5X1HcFp9qtIylwBkvEWkHU9dSqDBflweNiPtCI/8jL2WAeMfx/0iVc7MqzTyFubgBbMniLTpyMNN+qqxx/z/wBIq32KP2jP8vw0Gyn6GPsx8WzOTULoaSBBmRw7jw+aZgwHPax1+J4I/lHLuVWs85dbEAx1mPrKLCVgypnM6mBzlbRhnoML7YtufusZ4IY0gjSDz2J16yreEx4ztsblUS4EtjTXykfb5ofsl6COlhPny7kxm4jlz2IP2QvqjadBuevXRcXSOt/kggsM9z3kNN9SRI0nQE31hS/CPe8l2YaSQNR06pWEfkqB0k+0SIknhcb81qN7Qn3H3t7B6deq0CM+nhXCRDjys6xPkErE0Xgl5aTrZok3PIDqtduMkkZHW5tIHmofjogZHX5NcR5hXBozcZSORpA0iQGGTtNhdUsXSIcJ5D7rdGMPwOtza4bxyVDH1Q83aQSJ5RBI0I71cBoz2P4jp3qxUqtNgI7u5Umi5/RWphGQCJOtpi4IEE3gW6mEgiiz5/3TKuJJAjygfOB9UzFUDn4RIty18CUAouzezFpve3OBfL10lFCnQbcQRwyB1MfXYpFfFOLAwZeEuOcDK85jJDiDxCe+O5DXNyD5T+uSmmxlsw25dDf2xKG6Mvpa7LqWDCxjs08RBLhBzS0jf7FaGOewQ0sJPNpOvMgjqqfZYyuuBaNpiTOxTsdxPzBk5RNgbcj00+SzRteiuyADmE7WkGecG8WKJmKIHDnB0FrZeRtrCfUOcOJpuDoglxdMkawdjyKq0WvaMzXZfAzz5ou/ZqnH0WWU2TBHtEzD2+zHECYsTNl6vsj/AMNvXKDMQzEZGvBhhbmIgkQTvovFupudMvaSbGQ7bTVS+hpxbDQmFqPAbKFAbxA0B535rUwmHbwuaXC4kuaA2xtxEgLKwzzEbTIHWVfhxgl7yeZJnzRmw1RexVPPUL2kRGrg4CQDYWvyScV2M+nTFVzHBjiBmcMt3SbAidtdFo9jvmpTkzxs+rV638dPBwo/zGfNrlSeaSFLSbPnAog2k/rwXPw0b/T8k5jwJtPXklvfMfo+CQNvszDhrAJmxO3227wR3LIx8Cs7w8sg6lbmAM0wZ0PTXxP3aeRWF2y4mqYHs6+IHMDny89UfTaFUq0NeObGj6KWMIfNtNiPiBVE1MtyJB2Bj7HkmMxYzSG3iLnqloxZt9tvHDqOJ+jiBqOSzaY43GDdpIm41EmdyFf7Swpf6PK7OSxr3x7pebtEcrDvKpjCmm+CYa5nt3IkwCD1106FZiqRpu3RacOP+f8ApFWOx49I3n6IKo72/wCf+krHZMekZ/l6dICX6JexGGwLH02uLsrhIE6nfTkZ1hI7Twop02PY8n4sjXgg2s4lrRN9pVvB1HZBle4QBYwAJEGJP2TPxFVe6iwFzi0GHCS4AtytHhuLxcdVjUk6Kk1Zj4IzUaes9dDvKZhWmDO0mBrAGqRg3cTT+tCr4qAaE3+AcPLfuXVGTmUng+ybgQOGYv1SixzZa4EEzyP0Tsc7hY8OcC4ESTBBBa0xym58VmiqZIg23JtYCLq4T4Wacl5dcWdHP2TtlM+RTA5zQCASZdfKZA4eVDpy89k0YD8wmYfJMATlJEXjSNU2o8VALtcZdPsE+7Pv9Qhh6Dczie51yZ90GRm+L0M+F/ugfTblaW2I0GRoGusmlI8gif72nvbs2In3xzHLVQG2AJA1tw//AK/dXB6TTeWucdcocGiwgOdeCKYI7pMqs9sBoAHsnSB7zuTQPkrJZxOyua+xMN1sROtXbfRIxdiJ+H/7Oj3nfVXA6Bhq+SWjKZOhkESLkQb2V6k5upcZvsSfPxVKhg3FpeAHNaC90Obma3MGElurbkC43B0ugfUh2ZpNjAnXpdLZRH1K5zZRB0vvNzrzV89lP9GKgYXZry2Cep4TPyWO53EJ6cuRW2cQDSpnM2YuJuIJsQsSbXo6wUXF38Rg4p8vJPT6KxTonIDxXFoBvY9Oir4j2jfkrGRwpscIJJdAygRGpMiHedkyfDivZYwwiQZPXf6ImV/al0WjW/dr13UYFmcAAiXbiAPnEJFRsXN559Bpp1CvfDSVdHDFPFm1XQbGN+hv+pUseYLS+wBdGk6WA5/kqzHwbARGmh6J2JY3JmaQTbggzB6pyi0wA2dW3I1gfYp+XJwyLctFWo1AAAWkmTNtk+pXcTObW/XxtqrpKjMwzSTABMXPdN1r0g0zLw0ADXMZuBAga+Sq+pvDcoYbGecwua10Dhd12t0/NStEbXZb/wBtTjTOz/c26u/iP8QOrTTZlDWvs6cxdlkBwOwIJ23Giw6LyBmaDIi41kAGx5oH4ewJYYdpefZIGguNd9UySbTJPlFui0VGOL33YCGCQJmSNJNjFvms92kdytYEgPDckhzoIveDcdAenNd20S2pDmgcIGVsAN1tblZDL4WsFVIAGkT8+X/HkVjdoMmq521v9o7x5JjHkkNOgGmya8E5Wt95wb/qt91UFmRVI5EX3M2vpyCBn2PLktz8W4UUajKYLZa2DljXM/2t501+Sw6LyCYJEtcLEixBBFtipO1YM28VUPABr6Jlu4HpOwsfC0I2OJpw45Q0xEbnu8Aq2JZ7D9YYwROwE+Gvz8A2g/0lM5uuoEazA5os2kMPt/z/ANJWuzHwWzoKZPTQKm48f8/9Jcypla0wDwNsdNv1rspkn0gvc1rTlaLDVrXNNtxGvQ3Q9odoPfRyPjWRZzcreGA1oMRrsr1V5fTzvzOLXEm2axdluN9fksntGsXUwJdbWTbYANEWEDqs+2T4hGHzASRYcuoVgCAB37zud0VHCl7ZzsE8zp/Fa39lz8KWCJBi8tcCLnzXRAdjncNOJuHixixdcTtIJCpgbGYnaDbukXTcS7NlbyDvqoLLi8XjY2vJv5oZFjB1y1sACTmOtoynaRew3Gitetvy2A68M6ZYP/VsPFZmGBzNERZ1t/YdtB+hV5zHuaBliJmMwmAI1pGTb9bL77BMa7EPOYEHLe7QWna2cPldSrEETmLZcY4y7kJJcef9lX4pcOKDNodBPP8A6MHzK5tC4Dh8V8rSRYGR+yAn9X2OCXHVnEutbo1wNjtB+mqo4uoXuaSIOUCzS0anYoxSMvEmDJ9lsTmH/wAf5/dDVwvBLXcTQCGZPaBcc5loAZlEai6uIugsdlnLbM0td1BgwfEA+CqlsHz6hE2qDbdLLml9wSDMRGvXopkdNx3j7rSFNrqbScx9oAAuE3gGS0tGv62o0MKXyGkSDpI02vurw4A1j+AuBa18wAZkB8HQgkTtbqstN1R0jJJP9ozq7Cx8EDbedeoT8LisodJ0aWtGVlw7UOdrpJmDcAWlPw+FY/NTfwPngeTw5hYsfsAbX2i+q0cBi2smjUaGPZwmQBMah3XXv+unG1Ry9O0ZrK5cNB3bf8JT3kCYsZEnnvHXRbZFIn3O+yq42jScOAgOg3EFpnmNj1H9tOPCszKbwSJ5i+yhtO4DXB2m+oHo7x3AnxTPV3MIJHLu12ShVBiwGmjQPg/P5DksdHhzW21Gg36N/JDUH7w394cz1TqRaW2ALo0It5yCk4hhn2B+iequlw1GYpzRlGgEbLPpvA96bfoLly2zJawtSxmYzbawm1nMkBmf2bl51N+W2mq5chml6GWBblZUF2nicTp4DW0JHaTm8Dg2Jbe89Rt1XLllCxLKhiNpnx71FWuWCRE9QHDQ7EQuXJ+GWJc1tSC6SeTQAB9h3BA3AwSCHSLQL7aCNT4rlyESLeNpvYxkiAaY1BkxYjTrpPXdHgKZy5CWzzcWtaN7uNvErlyDYbjx/wA/9NCHkNb/AAN2nl0XLloyXWYvJTfZpggw5stMRqBrqs+nNRrjkENcLNkATuG8v+Fy5Y+mmS1uWABA7yb3/JMe2RC5ctmStUZmuAD7rQ3KDMz7Iv47+CVjKDqbWuc2xcAJn2hfe3LW3RSuWX8Eig0ZjYAAO4vB3OeR1TatRpA4mmDr+z5DmFy5bMkGoJdxN0O9PkuFYZRBbBJsDT6fvQuXKYDnGcwlv/baSNeJC97GZWvDLgnM4PMdBkJ1XLlls2ilhaUh3Hlh3QA2PM9FLafpHkAAuAIEN9qCBoLTF5HVcuSCFUn5HSP0FfrMFVsi65ckELZi4aA8kuaA0EiTAnKJi8Ao6+LNZ7TBcWgDPEGBNnW4trk2hcuWg+jA08j5I3MuQA4jYlpE2G3y8Fy5aI0mUiWAObsNe5UcVgIveOmvj5BcuWDZj4mQ/ly067iykYt3TzI+ULlyDm/Z/9k=",
      contents: "부산 돼지국밥 너무 맛있음. 비행기 타고 가면 2시간도 안걸림",
      comment_cnt: 10,
      like_cnt: 2,
      insert_dt: "2021-02-27 10:00:00",
    },
    {
      id: 1,
      nickname: "juyeong",
      title: "전주 여행 후기",
      country: "한국",
      city: "전주",
      evaluation: "아주 좋음",
      image_url:
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYWFRgVFRYYGBgYGRIYFRgYGBoZGBgSGBkZGRgYGBgcIS4lHB4sIRgYJjgmKy8xNTU1GiQ7QDszPy40NTEBDAwMEA8QGhISHzQhJCExNDU0NDQ0NDQ0NDQ0NDc0NDQ0NDQ0NDQ0NDQ0NDQ/MTQ0NDQ0NDQ0NDE0NDQ0NDQ0Mf/AABEIAKgBLAMBIgACEQEDEQH/xAAaAAACAwEBAAAAAAAAAAAAAAACAwABBAUG/8QAOxAAAQMCBQEFBwQCAQIHAAAAAQACEQMhBBIxQVFhEyJxgZEFFDJSobHwQsHR8WLhkhXyBiNDcoKi0v/EABkBAQEBAQEBAAAAAAAAAAAAAAABAgQDBf/EACMRAAMAAgICAgMBAQAAAAAAAAABEQISIUEDMQRhEyJRcSP/2gAMAwEAAhEDEQA/AKbWR9qsGZV2hXZDiOl2ygrHlc7tVYrIQ6TcQj94nVc0VUQqJCmw1AjaQsIqKxUQHQDW8prCOVzW1EYqKA6TT1Tcy5QqohXI3UhadBzkl90gYo8oH1VYKaC4pTmlZzUKnalCD2i6cFi7Qq+0KA6bKdrqnZQsTMU4bqs8m6kLTbRqNlbmVAuZScFoNQKNBM1vAKzVKIhLbVHKMPHKFM5YiLDynOeFchUkM4lOY8o8wVBwQpeYogUMqsxUA0ORiEmVYKAdAS3sUDuqmdACaSWWJpKGUJBZpoezWgPUzpRDywCgYmdmqc1bMgGmhyFHKmZALyog1XKjXICw1WFCVUoBgTA5IBV5kA0uQ50N0MFAGHo86QQqlAPlSUnMoCgH5leZLARBpQoU8KF8K2YdxgtaSO9cdAZ8ULnLGOSbaXRrLFpJvsNtRMFRZC5UCtmTUaqoVkjMrJCENPboxijyskqgUKbW4hQVzysoPRE2FAahWPKY0nlYyQia9Aag5yYCd1kbWWtlQKMqGsCOUvOFecKFDBTWuCRnCrMpBR7gJlVlSg9X2iopyxXHCj8p0CF2FveytrYK0ZGDCAqDBhEKvVMzuhSsCHezuELvZxWh73C8pfvhTkcGV+BISnYcre7GW0Wd1foryHDP2BQmkVqY/kJwe1KIYAEYKc7LKZSoAlKIZXhLcxdX3EcoHYHgpS6nLyIoW1+FIQ+7nhKSGZqYCtDMN0Tew6JSpHj8e1/aujMIu2C74fi7sGxnXxXfoUzlaHawJ4mF0qOElzSZsdBERM88ifwrIKT+Cubw57ZZL+M6vPhrhg/6hTqBQtw7joujQpmLhGRl6Lopyw5nu7+FfZkahaqlczZJLyqQENG6KAqLiqCoCzBQQqLVAxQgbGI+yQsfCa2tyhRXZmU0NIQvqwkPxKAbnKs1CsgxATPeUJRxzdUOd3VAMUrOKQDG4gjdaGYi2i57qgKAVOqQU9A0zqFbqLTqFhHtAJjcc3dZjN1DKuCadLKDBDkoPfmq/fW9VORwMdgWncpI9l8uTBim9Vbca3kp+w/UzP8AZfDvJUPZTuQtvvTeUba4OhCViIxs9kndyP8A6V/ktYqKxUSssRm/6UOU5mEy6JvaFX2vipWWIV2B6quxPVO7Uqu1KcjgV2Q4Vdmndoi7TwSiIz5FRp9Fpz+CkjhSlhhGFBc03/XsNs+/p+SraxwHgrqUhmaZaBD5Ef4uMn1P15WtjW6RoSLdCVyeB/vmd3ysf+eH+GIF07eiCtWGkFdMNaqNFpXZscMOHY7wrLBoCuwcCw6keituBYNFdkZ1ZxvdZ3+ip2Cdsu77sEt9GNwpsNThOwzxsgc141C7jqYGpCCGfMFdianCcx3BQZXDYrvyNoVZh+BXYmpwHl24PolElejLm8pbmMOsFNiann2slQ0j1Xd93ZsrLGjZXYannSCqLivREt4+iW4M+VNhqefLyh7Qr0DmM4+gSjhmfgV2JqYVc9UMjlQRyqQOVYf1QW5UjqgGiqVBVKUAOUWXqgGiuVfbpGVTKhTQMQrFfqVlylXCQU2e8n5ijZiiP1LBCsQpBToe+O+ZOHtA8DxXLlEHKaouzOq3H9AUTfaI3b9VyQ4IswU1Rdmdh3tFmzUDPaIm7Vy2uRZgo8UirJs2YnHvFmgxlMGBaGG5H5cFMpe0Qblp1P38EsinoSbFwNyIHZiLRfRJdSbJyEwTLQ43AIG8BcPxmt8kfU+Yn+PGdG1+OA0CA4/p9Vm93PIH1+ygwpO49Y+67oj5lZq9/HVUMcsxwp+ZvhmQPw7hwfBwSYkrNwx/T6oX4yVzoPCsK6omzNrq/h6Jbqp6JIZ1ChEbpEWscKp2+llO1P4Upr+p+iZ2hGh9QEJRorndo+qJuIA/QD6pmGxkHvNBHIXYo4+k4RlHmB/C8ssp0emOKfZwnVmn9EKw9vy/T/a69TGtH/p25gD9ko4mi4aQfEKbP+F1X9Oc0NP/AGlEKTeR6FdJtGif9OCb7nTicx/5NT8iKvGctmFadCCr9yb09V0fdqXzn/6/yq7JnzfRv8qfkLoeIyqZU8u6g+QQlo4C6acsFQFcDlMyN4H1U7IfhVogvL1Ujqj7EfhQOpeKUkJJ5UzFCafiqyFUDJKuSkEFS6EHSVMyUAfwqXQoztVO1S78Ki5AN7ZWKqTmUzIKaBVRsqSQDoSAfBZM/RFRrta9pcQ0TqdJAJE9F558Ys9fHzkl9nYY9k6n46msi+SJA3Bj6LPXqN7sTGVouI0t/Cw0faNHuQ8fG+0gRLIk9D9/GCdbEsLWNY4ktDhBaQQDBvI/L8r53x08fLzT6/y2n4eGh4roxieq54qKdovqQ+LsdE4jqrbWXOFZNbiApBsbu1ViosQxAUFdSDY6Da5HHoFRq9B6BYe3V9skLsau0Co1AspqhUKo4SEpsFYKdv1WQVhwi94HASDY0Or9Sh7ZZnVGnZRrwFYKa2PeNJCLtXnc+qz+8oDVUhaaS93I9UfvdQWzn/ksDqirOU1pNmhIqK+0WbMrzqUQ09oVRqFZ+0RZ+qtEHdoVBUKVmUzJRBvaKw9JzKw9KIOzKSEvMqLkpYOzKZhwk5kQqKUQeyOEXd4WbtFM6UsNQa3hU5g2CzCor7QpRBpYOFx/a9QhwaACI0JcIk690idF1O0Kz+0MKMge5rXFwnW+UkBseR+i8fLmsUk+zo+P4nk210cehinHvBoGUkth7wASLxLp2+6LDYiXg5WtlwBdLyTqCTmcQTeV38F7KaQ2GMh2YGYMwx5twZ/bz5jcM0VcpaAHOABmBfj1XNj5cdn9Hdn4W8Uv6dM0gq7Ecqi4tc5jviaYPWwIPoQrzruxz2Sa9M+Vng8cni1yihRKvsuqIPRZitbGdReVEGBHmKUcS2YkSpsNQ+yCHKrFQEbJbqzR+pvqFdhqMLVUJfvTfmb6hV70z5vzomw1G2V2WZ2MZzzwh99Zz9Eo1ZqICmYcJAxTeRv9FZxTfmCUmo7MrD1nOIbyEt2LZrNhqYMA8T6eqVDVm4VPD0RdsViGIbEh49Ut+OYDGYfnkpUIzJSxM6wNL3jqqOK6t1jXbm657Xcm2nnHRG128jXj+F5099UdjDUnuOZrmOZJAzPY2dgS3MHDlZ3vynvFpIn4XNdb/wCJI/pY2YgDZsxzbXWx1UZiW6mSbn6dbKc9li6NTsUNjP54IjiROUODiRsD6XAWV9VpvLri4tHhpxCIVWHeAIIInX9vBaTI8UNdiyLWJ2A19ENPFuOw3gRx56SshcQSWmTuYFweuqdlhgYBp3trSlGqHHGE6W1jfT8KsV3fNzsFnaHAiSQN9J/LphpGCRYDckC0TorSQb7y7kKDFmdQseb1k2vFvFCXxZwmNo16z5qUup0DijeAIvH7Sr977ul5uZtFtvXdYXNLGtcb5hIM/DyCBefFHnJNspsOLdClGppdiiBqDfTfw8FXvbo9fJZ3zlg5ZJLu6AdQLEi+2myFrRBknaBHPilGqN+GeXODbkamLy3zufL/AGtXtv2lTfUysdZpa2SC0QwRBB0vmtC4VXEPAhpgaC5mIaPsB6lZ+1drDd+f8uv+R+i5ssXnkm+vR2YNYYtL2/Z7PA+0qeSmQe6wuzk3h7g/x1nSeLccfHYpnbOJdILifP4gdeSsWDxT4yjQz+oi8D/8/UoXVHvJsDMi82+L0+M/ReC8cyyvf2dD8lxxnX0d7209r39qxwyvZTOwipAmYvESJ2IAXNzuae8TlNpB1bNy2ddPssFHEPzASAJdAkgDNMxe3xfQcJz2STcg3JsTfU216rp8NS1fRyedJvZdmj3nkna2aCRveCoyo2O84iZPxaP68/0srH7fELWnfax0/wBp1OkXkta1znNnuM77gJuYAsLr3OeIcS753SYAzEgSdO8bBIc+NTJvMEa+PmmjGPewU3PGQEZS57QADIkzJOpSa+Je4yCTADSQAQYMCCBceKym7CtL2AXi2/mNEx1UA90Nju63vvafFZnuy2c2OZbEH06ohi2xFhtMG4J1JWqZg6s46w3TRogC3+/7RaiMzNPPz9PqkMqtPTy2VgGJccguO80i9rTETEcapUIGQVR6byDoTPh1lZhV6A+YTqZJuwDrF45tH5KbDUt87kcWj82VueAADGxmZN//AG730P7LSaU0Q8hswLggEX+T/SzU6IIJ1iI/rUqbDUYQb9x0aSBIBO1jA9VVQwHSLQIGb9RtmgaG7ddcoTMazLlIAHdExb6eazYi1xeQA6J+IEmL9INuUZV9BMJygCYMEj91KtVrTDhTJ173aEgG4H/luj9+UtpgC/H1aTCmOotlpzZpaDOZtrkRp0+qmTXZUmIxDC3eQfI+nH+0toPB02TmYlsaP2Oo/NED6uzcwG2n1hByCGugmNEzLe1+ZBgW6osNWaD3wSBsCBfr3SFVV4M5WkSZjONODcDnZQoBaTt+eikO4Nhwi7UBpEEEzefOLHorpY0tgtcRbTUSb+e/qgFhp3/j1UoSNLm+l1sZTkl+Yku66X0WaoSLjuzaQBccQjKvTKcTNyZ85jRLdVdYeiF8bE9ZhNY2XTByxoSDeL6AfZCdFOe+NHbTwSI29FH1nAwcw6G9pI81ofTaASALG1x+FLfQJJ0GUkGNPTyKF/0jGl0ukA8EagDWw0WlzCI74/VNiCL7yFkyG/e+4joIUyunJmOk9PDwQhrq1oLRmOhLrZTHQzfxsVq9hUGVXve93cY0uyxJMfC3SOBfWbLmsdkMuJJNgQRax1kJQEXDgNLdAZGnVYzxbxaTlN4ZY45JtVI6PtPEd8ktaCYJaf0jZpg3cseGxYDgHgZZGfu3yk3IjolZGzsddZ/m6I4cOu2G9IOvOqmPjSxhvLyvLKrg9FQ7BjGPe5slxkAt7neNwAZ3kWhZfa1cNc5jIIkODg0HMHBpMmYGmwPFt+A6o4WEWtMCT4rdTyvA7R5BAhsARHeJEfmq88fAllW2z0y+S3jEoFTqwQHDM0xJiCPDQHzGy7vtCkH0RUBDXsLWvbIAe0juvbfeDr8sLzdZ7BAY8uPeBnugDaORrylCmdyJg31HOuy2/DclknIYXmSxeOStNT8S0NyhrQSZm2wP6he/CdhsU8tLWtYRY3ptfvrOUkCYWARPzRqQQPSQmUaxYcwltxFxDgDuALi0wvVrg8aamPL7FjZIJbkZcxMkRAtB2OiczEPofpILmunMMpiSDEjSWx5Que7EmTeDENgBrb6wBzf1QurOkEgO2uOZ1jxUnTFfRsxOKLhlyWGrpkxbK3wACzzIyw0XmYAOu5OyBtUzpAuNDBsehKBz3EABuWTxt6XSCjHkayG2sI3Av+6ZSqMBh7nEETDBLsxsRmcQIjgpbGuJDJvIEOJGvIjRFUwpa3N3DrvJ40iEeNQWUZ1m1MO5ry0gFosBS+PvQAIi1wZN7C1rcwPax4MuPzgDLEgy3vaHQTHOu66b3Wh8CGG5uGk6QB5q6mGs58tJElwzEmToBys44NFeaZ0MDjqYZkeZ70Br2uIyRObuambQeUqtiGMcypTLXa5mFhgHQBzSTmnXZc8BpcSMsW0uLibGOUbKWWDN5tHEHorr9k2+huKx7n95wa1wsIYGtykG2WDf+eiUXNMQfQa9dFqwD80ggukTrpAKXjnQWnLF3WkD5bytpRGXlcvRnqYgCwE6XkiDcRCXUrBxki+8CB6CyS65PUlX5KFGNdltlzC2b+wm9r3pDPWx8EGGcJM3s77EpdN514CUko2qS34mQTexulP72xm260B5ccxuGi55A/dR1a2VrdZubbT9kbNJCH0ANTN/3RvYALDj7pjiRcgXjUf5ajrb7pVWpIULC3mB4i20GSjY0huaxgjeQCZ+8fRZ6j5hG+p5jxgeg0UyZrHEbnOlvwFv7KqdUTLpgi8DeNbrI56IPSh402NY0k96wueoWpwmSxvxGTwT5nqudhzMybWnwErqMqiBl028FtHllwZQHi5gciIhLYQXyTaObeqmLfLoI1FvFU3DEkDc6XShILHU7SNNx5a/VZgRuVpbh3d3W8wZ0G/2VtwQLsoifE/xCjdKuEI8P2UY8gFOqYbI3NG4Gp/havZJoOc41HNZbKwOaXjO4Ol5bocoFgbEuF7XFOS/4jNkEwvTVfYdJgY9+JYWOOUA03hxJsTI/S2QZOpaQh9o4Ck9rqlKsxtNgptDeyeHFxkZS7L332Lj0OwAJQU4GHdfyKOgCBsbWkaeF1b6QbdrjPBAH7puGpAi5dN7NE29EjI2mKGYmbDXbTyT2S28tloObunfcjT+kLqDwe60nguj6hJdSffuX3+I/uhZQpgiX3BDvh/31S302gwXOt4fS6pvJbHJ5PrZEWEguiwiTDYE6SYtohYLBbu530THPZmmXzvpwlu6QP8Aj/CEk/MhDqMosc17y8Bwg5STLiZFo8PqsmLq53uflY3MZysbDG9GtMwEnOdzrx0iLDTQKO8vVZjtK56RTDfwhdLC5BlMHN8RN4zA26cLmMYbmLcrZg6Re4CYyjNpNgQStJwjV9A4p2d7nuzlznOc+7W94mTaOSeEVFzTAgyOv8BA+gA/vGATIOtid1qp0KYuSTE3nKD4ifsqvozl9ig7Ke7b+tx5qg0PIaZiXF15uQN/EfVaXUqYIkGSbXdt5p78Ky5i99yqZOZRw2doGaC0nuxJv/RRPwL5sJHMFMqOaYtF7SSb+BN0iqwkk90dJH8Jwi3J9isPEE3/AFfYfynUgy/dbpvzblRRYRsASWQLCXFx6ACyaKhJB0u0eQbl+0qKLL9m16BexzvK9+J/2s7xCiidm4ogXM+unqjdTj4pBiQNtov4E+npSiy+gl7FprGFzthO8Q0a8C3oqUR+i4hsZqIggDncaqCRabcXn0VqLeL/AFRjLFVkyiZLtD1T2VxIIN2zsd1aiI82hrKokToJiAZk/wBo21RnLgDcAQBH7qKLQF44OnLBySJJmJ8Rx+yyNe0GDlgakB2bkQTaVFEZEbTiDUaA490GGwRMax3t/C1ysz6jsrWOdDGlxaLWLok9Tpqooqh2LhvPnaB5DVSnWLDN4kxE6qKKA7FD/wARVWFmQsBa5zm2/U8ZTNuCs2JFTvPc4XdcA6l2Z0gcWPqFFFnTHF8Gt8slyYSzOXAay0aACO9uPJNbgXxGxiRmsY0tCii3EZeToIwLwfhHqEGQgkEC0qKLURnZlNad/oFWS8Rew8xoooslCqMIseYI48boHwBeDNxBIgq1FAjTh8W4NytGusmZ9RZXUDgRJEkAwCDYgHyt9lFEQYunics6CWkXv6JfvZE3mxETvsYUUVZUkZ21CSJO88LrNNh4BRRREyP/2Q==",
      contents: "하루동안 다 볼 수 있는 곳. 먹을 것이 많다.",
      comment_cnt: 10,
      like_cnt: 2,
      insert_dt: "2021-02-27 10:00:00",
    },
  ],
};
// 게시글 하나에는 어떤 정보가 있어야 하는 지 하나 만들어둡시다! :)
const initialPost = {
  id: 0,
  nickname: "juyeong",
  title: "부산 여행 후기",
  country: "한국",
  city: "부산",
  evaluation: "아주 좋음",
  image_url:
    "data:image/jpeg;base64,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",
  contents: "부산 돼지국밥 너무 맛있음. 비행기 타고 가면 2시간도 안걸림",
  comment_cnt: 10,
  like_cnt: 2,
  insert_dt: "2021-02-27 10:00:00",
};

const getPostDB = () => {
  return function (dispatch, getState, { history }) {
    postApis.getPost().then((res) => {
      console.log(res);
    });
  };
};

const addPostDB = (post_list) => {
  return function (dispatch, getState, { history }) {
    postApis
      .createPost(post_list)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// reducer
export default handleActions(
  {
    [SET_POST]: (state, action) => produce(state, (draft) => {}),
    [ADD_POST]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

// action creator export
const actionCreators = {
  setPost,
  addPost,
  getPostDB,
  addPostDB,
};
export { actionCreators };
