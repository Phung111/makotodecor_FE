import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Form, Input, Upload, Image, Card, Row, Col, InputNumber, Select, message, Typography } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import ImageUploader from '../../../components/Other/ImageUploader';

const { TextArea } = Input;
const { Title, Text } = Typography;
const { Option } = Select;

export default function ProductForm({ mode }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  // States
  const [defaultImage, setDefaultImage] = useState(null);
  const [prices, setPrices] = useState([]);
  const [colors, setColors] = useState([]);
  const [otherImages, setOtherImages] = useState([]);
  const [detailImages, setDetailImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Xác định đang ở view, edit hay create
  const isView = mode === 'view';
  const isEdit = mode === 'edit';
  const isCreate = mode === 'create';

  // Handlers
  const handleEdit = () => navigate(`/product/edit/${id}`);
  const handleCancel = () => navigate(-1);

  // Price handlers
  const addPrice = () => {
    setPrices([...prices, { id: Date.now(), size: '', price: 0, discount: 0 }]);
  };

  const removePrice = (id) => {
    setPrices(prices.filter((p) => p.id !== id));
  };

  const updatePrice = (id, field, value) => {
    setPrices(prices.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  // Color handlers
  const addColor = () => {
    setColors([...colors, { id: Date.now(), name: '', color: '#000000', image: null }]);
  };

  const removeColor = (id) => {
    setColors(colors.filter((c) => c.id !== id));
  };

  const updateColor = (id, field, value) => {
    setColors(colors.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
  };

  // Image handlers
  const handleDefaultImageUpload = (info) => {
    if (info.file.status === 'uploading') {
      return;
    }
    if (info.file.status === 'done') {
      const file = info.file.originFileObj;
      const reader = new FileReader();
      reader.onload = (e) => {
        setDefaultImage({
          url: e.target.result,
          name: file.name,
          file: file,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleColorImageUpload = (colorId, info) => {
    if (info.file.status === 'uploading') {
      return;
    }
    if (info.file.status === 'done') {
      const file = info.file.originFileObj;
      const reader = new FileReader();
      reader.onload = (e) => {
        updateColor(colorId, 'image', {
          url: e.target.result,
          name: file.name,
          file: file,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDefaultImageRemove = () => {
    setDefaultImage(null);
  };

  const handleColorImageRemove = (colorId) => {
    updateColor(colorId, 'image', null);
  };

  // Form submission
  const handleSubmit = async (values) => {
    setLoading(true);

    try {
      // Validate required images
      if (!defaultImage) {
        message.error('Vui lòng tải ảnh mặc định cho sản phẩm');
        setLoading(false);
        return;
      }

      const formData = {
        ...values,
        defaultImage,
        prices: prices.filter((p) => p.size && p.price > 0), // Only include valid prices
        colors: colors.filter((c) => c.name && c.color), // Only include valid colors
        otherImages,
        detailImages,
      };

      console.log('Form Data to be sent:', JSON.stringify(formData, null, 2));

      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      message.success('Tạo sản phẩm thành công!');
      navigate('/managerment/product');
    } catch (error) {
      message.error('Có lỗi xảy ra khi tạo sản phẩm');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='pb-20'>
      <Form form={form} layout='vertical' onFinish={handleSubmit} disabled={isView}>
        {/* 1. Tên sản phẩm */}
        <Card title='Thông tin cơ bản' className='mb-6'>
          <Form.Item name='name' label='Tên sản phẩm' rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}>
            <Input placeholder='Nhập tên sản phẩm' />
          </Form.Item>
        </Card>

        {/* 2. Ảnh mặc định */}
        <Card title='Ảnh mặc định' className='mb-6'>
          <div className='flex gap-4'>
            <Upload
              name='defaultImage'
              listType='picture-card'
              showUploadList={false}
              beforeUpload={() => false}
              onChange={handleDefaultImageUpload}
              accept='image/*'
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Tải ảnh</div>
              </div>
            </Upload>
            {defaultImage && (
              <div className='border rounded-lg p-2 relative'>
                <Image src={defaultImage.url} alt={defaultImage.name} width={400} height={400} className='object-cover' />
                <Button
                  type='text'
                  danger
                  icon={<DeleteOutlined />}
                  onClick={handleDefaultImageRemove}
                  className='absolute top-2 right-2'
                  size='small'
                />
              </div>
            )}
          </div>
        </Card>

        {/* 3. Cấu hình giá */}
        <Card title='Cấu hình giá' className='mb-6'>
          <div className='space-y-4'>
            {prices.map((price, index) => (
              <Row key={price.id} gutter={16} align='middle'>
                <Col span={6}>
                  <Input placeholder='Kích thước' value={price.size} onChange={(e) => updatePrice(price.id, 'size', e.target.value)} />
                </Col>
                <Col span={6}>
                  <InputNumber
                    placeholder='Giá'
                    value={price.price}
                    onChange={(value) => updatePrice(price.id, 'price', value)}
                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                    style={{ width: '100%' }}
                  />
                </Col>
                <Col span={6}>
                  <InputNumber
                    placeholder='Giảm %'
                    value={price.discount}
                    onChange={(value) => updatePrice(price.id, 'discount', value)}
                    min={0}
                    max={100}
                    style={{ width: '100%' }}
                  />
                </Col>
                <Col span={4}>
                  <Button type='text' danger icon={<DeleteOutlined />} onClick={() => removePrice(price.id)} />
                </Col>
              </Row>
            ))}
            <Button type='dashed' onClick={addPrice} block icon={<PlusOutlined />}>
              Thêm giá
            </Button>
          </div>
        </Card>

        {/* 4. Cấu hình màu */}
        <Card title='Cấu hình màu' className='mb-6'>
          <div className='space-y-4'>
            {colors.map((color, index) => (
              <Row key={color.id} gutter={16} align='middle'>
                <Col span={6}>
                  <Input placeholder='Tên màu' value={color.name} onChange={(e) => updateColor(color.id, 'name', e.target.value)} />
                </Col>
                <Col span={4}>
                  <input
                    type='color'
                    value={color.color}
                    onChange={(e) => updateColor(color.id, 'color', e.target.value)}
                    className='w-full h-10 border rounded'
                  />
                </Col>
                <Col span={8}>
                  <div className='flex gap-2 items-center'>
                    <Upload
                      name='colorImage'
                      listType='picture-card'
                      showUploadList={false}
                      beforeUpload={() => false}
                      onChange={(info) => handleColorImageUpload(color.id, info)}
                      accept='image/*'
                    >
                      <div>
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Ảnh</div>
                      </div>
                    </Upload>
                    {color.image && (
                      <div className='relative'>
                        <Image src={color.image.url} alt={color.image.name} width={80} height={80} className='object-cover rounded' />
                        <Button
                          type='text'
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() => handleColorImageRemove(color.id)}
                          className='absolute -top-2 -right-2'
                          size='small'
                        />
                      </div>
                    )}
                  </div>
                </Col>
                <Col span={4}>
                  <Button type='text' danger icon={<DeleteOutlined />} onClick={() => removeColor(color.id)} />
                </Col>
              </Row>
            ))}
            <Button type='dashed' onClick={addColor} block icon={<PlusOutlined />}>
              Thêm màu
            </Button>
          </div>
        </Card>

        {/* 5. Ảnh khác */}
        <Card title='Ảnh khác' className='mb-6'>
          <ImageUploader images={otherImages} onImagesChange={setOtherImages} title='' maxImages={10} className='' />
        </Card>

        {/* 6. Ảnh chi tiết */}
        <Card title='Ảnh chi tiết' className='mb-6'>
          <ImageUploader images={detailImages} onImagesChange={setDetailImages} title='' maxImages={20} className='' />
        </Card>

        {/* 7. Mô tả */}
        <Card title='Mô tả' className='mb-6'>
          <Form.Item name='description' label='Mô tả sản phẩm'>
            <TextArea rows={6} placeholder='Nhập mô tả sản phẩm...' />
          </Form.Item>
        </Card>
      </Form>

      {/* Footer buttons */}
      <div
        style={{
          position: 'fixed',
          left: 0,
          right: 0,
          bottom: 0,
          background: '#fff',
          borderTop: '1px solid #eee',
          padding: 16,
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 12,
          zIndex: 10,
        }}
      >
        {isView && (
          <Button type='primary' onClick={handleEdit}>
            Chỉnh sửa
          </Button>
        )}
        {isEdit && (
          <>
            <Button onClick={handleCancel}>Huỷ</Button>
            <Button type='primary' loading={loading} onClick={() => form.submit()}>
              Cập nhật
            </Button>
          </>
        )}
        {isCreate && (
          <>
            <Button onClick={handleCancel}>Huỷ</Button>
            <Button type='primary' loading={loading} onClick={() => form.submit()}>
              Tạo mới
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

ProductForm.propTypes = {
  mode: PropTypes.oneOf(['view', 'edit', 'create']).isRequired,
};
