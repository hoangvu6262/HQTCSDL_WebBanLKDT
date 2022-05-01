import React, { useEffect} from "react";
import { GetAllProductPaging } from "../../../redux/actions/product.action";
import { GetNewsList } from "../../../redux/actions/news.action"
import { GetListCategory } from "../../../redux/actions/category.action";
import { useDispatch, useSelector } from "react-redux";

import MegaMenu from "../../../container/Main/MegaMenu";
import ProductContainer from "../../../container/Main/ProductContainer"
import NewsContainer from "../../../container/Main/NewsContainer"
import ProductCarouselContainer from "../../../container/Main/ProductCarouselContainer"





const Home = () => {
    const dispatch = useDispatch();

    const { listProductsPaging } = useSelector((state) => state.product);
    const { listNews } = useSelector(state => state.news)

    //console.log(cart);

    useEffect(() => {
        dispatch(GetListCategory())
        dispatch(GetAllProductPaging(1, 10));
        dispatch(GetNewsList())
    }, []);

    
    

    return (
        <>
            <MegaMenu />
            <ProductCarouselContainer listProductsPaging={listProductsPaging}/>
            <ProductContainer tittle="Sản phẩm mới" listProductsPaging={listProductsPaging} />
            <ProductContainer tittle="Màn hình" listProductsPaging={listProductsPaging} />
            <ProductContainer tittle="Bàn phím" listProductsPaging={listProductsPaging} />
            <NewsContainer listNews={listNews} />
        </>
    );
}

export default Home;