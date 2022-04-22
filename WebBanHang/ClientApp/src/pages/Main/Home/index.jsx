import React, { useEffect} from "react";
import { GetAllProductPaging } from "../../../redux/actions/product.action";
import { GetNewsList } from "../../../redux/actions/news.action"
import { GetListCategory } from "../../../redux/actions/category.action";
import { useDispatch, useSelector } from "react-redux";

import MegaMenu from "../../../container/Main/MegaMenu";
import ProductContainer from "../../../container/Main/ProductContainer"
import NewsContainer from "../../../container/Main/NewsContainer"





const Home = () => {
    const dispatch = useDispatch();

    const { listProductsPaging, cart } = useSelector((state) => state.product);
    const { listCategory } = useSelector(state => state.category);
    const { listNews } = useSelector(state => state.news)

    //console.log(cart);

    useEffect(() => {
        dispatch(GetListCategory())
        dispatch(GetAllProductPaging(1, 12));
        dispatch(GetNewsList())
    }, []);

    
    

    return (
        <>
            <MegaMenu />
            <ProductContainer tittle="Sản phẩm mới" listProductsPaging={listProductsPaging} />
            <ProductContainer tittle="Màn hình" listProductsPaging={listProductsPaging} />
            <ProductContainer tittle="Bàn phím" listProductsPaging={listProductsPaging} />
            <NewsContainer listNews={listNews} />
        </>
    );
}

export default Home;