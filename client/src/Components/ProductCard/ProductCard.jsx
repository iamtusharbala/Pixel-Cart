import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    return (
        <Card sx={{ maxWidth: 345, marginBottom: 5 }}>
            <CardMedia
                sx={{ height: 140 }}
                image={product.image}
                title="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    <Link to={`/product/${product._id}`}> {product.name}</Link>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.description}
                </Typography>
                <Typography variant="body3" color="text.secondary">
                    ${product.price}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default ProductCard