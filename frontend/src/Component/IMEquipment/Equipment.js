
import EquipmentForm from './EquipmentForm';
import Header from '../topNav/IM/Header'
import Footer from '../bottomNav/IM/Footer'
import background from '../pictures/stock.jpg';
const Equipments=()=>{
  return(
    <div>
      <Header/>
      <div style={{
              backgroundImage: `url(${background})`, // <-- Path to your image
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              minHeight: '100vh'
            }}>
      <EquipmentForm />
      </div>
      <Footer/>
    </div>
    
  );
} 

export default Equipments;