import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Landing from '@/pages/landing/Landing';
import Room from '@/pages/room/Room';
import Layout from '@/components/units/layout/Layout';


const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/room/:id" element={<Room />} />
          <Route path="*" element={<Navigate replace to='/' />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
