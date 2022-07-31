import React, { useEffect, useState } from "react"
import MetaTags from 'react-meta-tags';
import { Button, Card, CardBody, Col, Container, Label, Row } from "reactstrap"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import Select from "react-select";
import { getUsersByRole } from "store/user/services";
import WeekComponent from "./components/weekComponents";
import MonthComponent from "./components/monthComponents";
import { useSelector } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';  

import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useDispatch } from 'react-redux';
import { getPlannigDailyAsync } from 'store/plannigDaily/actions';


const PlanningControlDaily = (props) => {   

    const dispatch = useDispatch();
    const { userOptions, setSelectedUsers } = props

    const connectedUser = useSelector(state => state.User?.user)
    const [merchandisers] = useState([])
    const [selectedMerchandiser, setSelectedMerchandiser] = useState([])
    const [StartDate, setStartDate] = useState(Date());
    const [EndDate, setEndDate] = useState(Date());
    const [nbreJour, setNbreJour] = useState([]);
    useEffect(async () => {
        await getUsersByRole("merchandiser").then((data) => {
            
            data.forEach(element => {
                merchandisers.push({ value: element.id, label: element.first_name + " " + element.last_name }) 
            });
        })
    }, []) 

    useEffect(() => {
        if (connectedUser?.role?.name === "merchandiser") {
            setSelectedMerchandiser(connectedUser.id);
        }
    }, [connectedUser])




    const Search = async() => {
      var listUser=[];
      await selectedMerchandiser.forEach((user)=>{
        listUser.push(user.value)
      })
      var d = new Date(StartDate);
      var startDate = d.getFullYear()  + "-" + (d.getMonth()+1) + "-" + d.getDate();
      var d1= new Date(EndDate);
      var endDate = d1.getFullYear()  + "-" + (d1.getMonth()+1) + "-" + d1.getDate();
      const nbre=((new Date(endDate)-new Date(startDate))/86400000)+1;
      let list=[];
      const data=dispatch(await getPlannigDailyAsync(listUser,startDate.toString(),endDate.toString())).payload
      for(var i=0;i<nbre;i++)
      {
        let date=new Date((new Date(startDate)).setMilliseconds((new Date(startDate)).getMilliseconds()+i*86400000))
        let month="";
        let day="";
        if((date.getMonth()+1).toString().length>1)
          month=(date.getMonth()+1).toString()
        else
          month='0'+(date.getMonth()+1).toString()
        if(date.getDate().toString().length>1)
          day=date.getDate().toString()
        else
          day='0'+date.getDate().toString()
        let fliter =date.getFullYear()  + "-" +month + "-" + day
        let listeM=[]
      await selectedMerchandiser.forEach((user)=>{
        listeM.push({title:user.label,liste:[]})
      })
        for(var j=0;j<data.PlannigDailys.length;j++)
        {
          let listeAction=data.PlannigDailys[j]
          
          for(var h=0;h<listeM.length;h++)
          {
            if(listeAction[0].user.first_name+" "+listeAction[0].user.last_name==listeM[h].title)
            {
              let result=data.PlannigDailys[j].filter(el=>el.day.indexOf(fliter)>-1)
              listeM[h].liste=result
            }
          }
          console.log()
        }
        list.push({data:listeM,value:date.toDateString('EEEE dd MMM yyyy')})
      }
      setNbreJour(list)
    }





    return (
        <div className="page-content " >
            <MetaTags>
                <title>Planning review</title>
            </MetaTags>
            <Container fluid={true}>
                <Breadcrumbs title="Planning" breadcrumbItem="Planning review" />
                <Card>
                    <CardBody>
                        {(connectedUser?.role?.name === "admin" || connectedUser?.role?.name === "super_admin") &&


                            <Row style={{ width: "50%", margin: "auto" }}>
                            
                                <Col>
          <Label style={{ marginTop: "1rem" }}>Choose marchandisers</Label> 
          <Select
            placeholder="Marchandisers..."
            options={merchandisers}
            isMulti={true}
            value={userOptions}
            classNamePrefix="select2-selection"
            onChange={(e) => { setSelectedMerchandiser(e) }}
          />
        </Col>

        </Row> }
        <Row style={{ width: "50%", margin: "auto",marginTop:"2%" }}>
                            
                                <Col style={{ marginRight:"2%",marginBottom:"2%" }}>
          <LocalizationProvider dateAdapter={AdapterDateFns} >
      <DatePicker
        label="Date Start"
        value={StartDate}
        inputFormat="EEEE dd MMM yyyy"
        onChange={(newValue) => {
          setStartDate(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
      </LocalizationProvider>
      </Col>
      <Col>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Date End"
        value={EndDate}
        inputFormat="EEEE dd MMM yyyy"
        onChange={(newValue) => {
          setEndDate(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
        </Col>
        


        <Col style={{ marginRight:"2%",marginBottom:"2%" }}>
          <Button  style={{ height:"90%",width:"100%" }} onClick={() => {Search()}}>search</Button>
        </Col>
        </Row> 
                    </CardBody>
                </Card>


                

            </Container >

            {nbreJour.map((jour) => {
              return (<Container>  
                <Row className="m-5 p-5" >  
                  <Col style={{ color: "white",backgroundColor:"#757575",paddingTop:"2%",paddingBottom:"2%",fontSize:"26px" }} ><center>{jour.value}</center> </Col>  
                </Row> 
                {jour.data.map((mar) => {
              return (<div class="row">
              <div class="col-sm-3">
                <div class="well">
                
                <h5 style={{writingMode: "vertical-rl",textOrientation: "mixed",transform: "rotate(-180deg)",color: "white",backgroundColor:"#757575",padding:"8%"}}>{mar.title} </h5>
                </div>
              </div>
              <div class="col-sm-9">
              
              {mar.liste.map((action) => {
                let storeName=action.store.name
                let color="#dc3545";
                if (action.stocks.length > 0 && action.displays.length > 0) {
                  color="#198754"
              } else if ((action.stocks.length === 0 && action.displays.length > 0) || (action.stocks.length > 0 && action.displays.length === 0)) {
                color="#ffc107"
              }
              console.log(color) 
              return (
                <Row>  
              <Col class="bg-primary p-2" style={{backgroundColor:color,marginLeft:"-15%",marginBottom:'2%',color:"#000",fontSize:'18px',fontWeight:"600"}} md>{storeName}</Col>
              </Row>
              )
              })}
              </div>
            </div>)
            })}
              </Container> )
              })}
        </div >










    )
}
export default PlanningControlDaily