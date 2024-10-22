import {React, useState} from 'react'
import {Link} from 'react-router-dom'
import styles from '../../styles/styles'
import {productData} from '../../static/data'
import {AiOutlineSearch} from 'react-icons/ai' 
import {IoIosArrowForward} from 'react-icons/io'
import {BiMenuAltLeft} from 'react-icons/bi'

const Header = () => {
    const [searchTerm, setSetsearchTerm] = useState("");
    const [searchData, setSearchData] = useState(null);
    const [active, setActive] = useState(false);

    const handleSearchChange =( e)=>{
        const term = e.target.value;
        setSearchData(term);

        const filteredProducts = productData && productData.filter((p)=>{
            p.name.toLowerCase().includes(term.toLowerCase());
        })
        setSearchData(filteredProducts);
    }

    window.addEventListener("scroll", ()=>{
        if(window.screenY > 70){
            setActive(true);
        }else{
            setActive(false);
        }
    });

  return (
    <>
    <div className={`${styles.section}`}>
        <div className='hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between'>
            <div>
                <Link to="/">
                <img src='https://i.ibb.co/xsmvkyX/add-to-cart.png' className='w-[50px] h-[50px]' alt='logo'/>
                </Link>
            </div>
            {/*Search Box*/}
          <div className="w-[50%] relative">
            <input
              type="text"
              placeholder="Search Product..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
            />
            <AiOutlineSearch
              size={30}
              className="absolute right-2 top-1.5 cursor-pointer"
            />
            {searchData && searchData.length !== 0 ? (
              <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                {searchData &&
                  searchData.map((i, index) => {
                    return (
                      <Link to={`/product/${i._id}`}>
                        <div className="w-full flex items-start-py-3">
                          <img
                            src={`${i.images[0]?.url}`}
                            alt=""
                            className="w-[40px] h-[40px] mr-[10px]"
                          />
                          <h1>{i.name}</h1>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            ) : null}
          </div>
            <div className={`${styles.button}`}>
                <Link to="/seller">
                    <h1 className='text-white flex items-center text-sm'>Become Seller
                        <IoIosArrowForward className='ml-1'/>
                    </h1>
                </Link>
            </div>

        </div>
    </div>
    <div className={`${active == true ? "shadow-sm fixed top-0 left-0 z-10": null} transition hidden 800px:flex items-center justify-between w-full  bg-white h-[70px]`}>
        <div className={`${styles.section} relative ${styles.normalFlex} justify-between`}>
            {/**Categories */}
            <div>
                <div className='relative h-[60px] mt-[10px] w-[270px hidden 1000px:block]'>
                    <BiMenuAltLeft size={30} className='absolute top-3 left-2'/>
                </div>
            </div>
        </div>
        </div>
    </>
  );
};

export default Header
