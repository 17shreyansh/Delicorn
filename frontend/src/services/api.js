/**
 * UNIFIED API SERVICE - COOKIE-BASED AUTHENTICATION ONLY
 * No localStorage - Pure HttpOnly cookies
 */

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Always send cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    if (import.meta.env.DEV) {
      console.log(`[API] ${config.method.toUpperCase()} ${config.url}`);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    if (import.meta.env.DEV) {
      console.log(`[API] ${response.config.method.toUpperCase()} ${response.config.url} ${response.status}`);
    }
    return response;
  },
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message;

    console.error(`[API Error]`, error.config?.method?.toUpperCase(), error.config?.url, status, message);

    // Redirect to login on 401 (except login page itself)
    if (status === 401 && !error.config?.url?.includes('/auth/login') && window.location.pathname !== '/login') {
      console.log('[API] Unauthorized - redirecting to login');
      window.location.href = '/login';
    }

    return Promise.reject({
      status: status || 0,
      message: message || 'Request failed',
      data: error.response?.data,
    });
  }
);

// ============ API SERVICE ============

const apiService = {
  // ===== AUTHENTICATION =====
  async login(credentials) {
    const { data } = await api.post('/auth/login', credentials);
    return data;
  },

  async logout() {
    const { data } = await api.post('/auth/logout');
    return data;
  },

  async register(userData) {
    const { data } = await api.post('/auth/register', userData);
    return data;
  },

  async getProfile() {
    const { data } = await api.get('/auth/profile');
    return data;
  },

  async updateProfile(userData) {
    const { data } = await api.put('/auth/profile', userData);
    return data;
  },

  async getUsers() {
    const { data } = await api.get('/auth/users');
    return data;
  },

  async getAdmins() {
    const { data } = await api.get('/auth/admins');
    return data;
  },

  // ===== PRODUCTS =====
  async getProducts(params = {}) {
    const { data } = await api.get('/products', { params });
    return data;
  },

  async getProduct(slug) {
    const { data } = await api.get(`/products/${slug}`);
    return data;
  },

  async getProductsByType(type, params = {}) {
    const { data } = await api.get(`/products/type/${type}`, { params });
    return data;
  },

  async getFeaturedProducts(limit = 8) {
    const { data } = await api.get('/products', { params: { featured: true, limit } });
    return data;
  },

  async getRelatedProducts(slug, limit = 4) {
    const { data } = await api.get(`/products/${slug}/related`, { params: { limit } });
    return data;
  },

  async createProduct(productData) {
    const { data } = await api.post('/products', productData);
    return data;
  },

  async updateProduct(id, productData) {
    const { data } = await api.put(`/products/${id}`, productData);
    return data;
  },

  async deleteProduct(id) {
    const { data } = await api.delete(`/products/${id}`);
    return data;
  },

  async searchProducts(query, filters = {}) {
    const { data } = await api.get('/products', { params: { search: query, ...filters } });
    return data;
  },

  // ===== CATEGORIES =====
  async getCategories(params = {}) {
    const { data } = await api.get('/categories', { params });
    return data;
  },

  async createCategory(categoryData) {
    const { data } = await api.post('/categories', categoryData);
    return data;
  },

  async updateCategory(id, categoryData) {
    const { data } = await api.put(`/categories/${id}`, categoryData);
    return data;
  },

  async deleteCategory(id) {
    const { data } = await api.delete(`/categories/${id}`);
    return data;
  },

  // ===== BRANDS =====
  async getBrands() {
    const { data } = await api.get('/brands');
    return data;
  },

  async createBrand(brandData) {
    const { data } = await api.post('/brands', brandData);
    return data;
  },

  async updateBrand(id, brandData) {
    const { data } = await api.put(`/brands/${id}`, brandData);
    return data;
  },

  async deleteBrand(id) {
    const { data } = await api.delete(`/brands/${id}`);
    return data;
  },

  // ===== ORDERS =====
  async getOrders() {
    const { data } = await api.get('/orders/my-orders');
    return data;
  },

  async getAdminOrders(params = {}) {
    const { data } = await api.get('/orders/admin/orders', { params });
    return data;
  },

  async getOrder(id) {
    const { data } = await api.get(`/orders/${id}`);
    return data;
  },

  async createOrder(orderData) {
    const { data } = await api.post('/orders', orderData);
    return data;
  },

  async updateOrderStatus(id, statusData) {
    const { data } = await api.patch(`/orders/admin/orders/${id}/status`, statusData);
    return data;
  },

  async getCODStatus() {
    const { data } = await api.get('/orders/cod-status');
    return data;
  },

  async toggleCOD(enabled) {
    const { data } = await api.post('/orders/admin/toggle-cod', { enabled });
    return data;
  },

  // ===== COUPONS =====
  async getCoupons() {
    const { data } = await api.get('/coupons/public');
    return data;
  },

  async getAdminCoupons(params = {}) {
    const { data } = await api.get('/coupons/admin', { params });
    return data;
  },

  async getCoupon(id) {
    const { data } = await api.get(`/coupons/admin/${id}`);
    return data;
  },

  async createCoupon(couponData) {
    const { data } = await api.post('/coupons/admin', couponData);
    return data;
  },

  async updateCoupon(id, couponData) {
    const { data } = await api.put(`/coupons/admin/${id}`, couponData);
    return data;
  },

  async deleteCoupon(id) {
    const { data } = await api.delete(`/coupons/admin/${id}`);
    return data;
  },

  async toggleCouponStatus(id) {
    const { data } = await api.patch(`/coupons/admin/${id}/toggle-status`);
    return data;
  },

  async validateCoupon(code) {
    const { data } = await api.get(`/coupons/validate/${code}`);
    return data;
  },

  async getCouponAnalytics(period = '30d') {
    const { data } = await api.get('/coupons/admin/analytics', { params: { period } });
    return data;
  },

  // ===== WISHLIST =====
  async getWishlist() {
    const { data } = await api.get('/wishlist');
    return data;
  },

  async addToWishlist(productId) {
    const { data } = await api.post('/wishlist', { productId });
    return data;
  },

  async removeFromWishlist(productId) {
    const { data } = await api.delete(`/wishlist/${productId}`);
    return data;
  },

  // ===== REVIEWS =====
  async getProductReviews(productId) {
    const { data } = await api.get(`/reviews/product/${productId}`);
    return data;
  },

  async createReview(reviewData) {
    const { data } = await api.post('/reviews', reviewData);
    return data;
  },

  async updateReview(id, reviewData) {
    const { data } = await api.put(`/reviews/${id}`, reviewData);
    return data;
  },

  async deleteReview(id) {
    const { data } = await api.delete(`/reviews/${id}`);
    return data;
  },

  // ===== SUPPORT TICKETS =====
  async getTickets(params = {}) {
    const { data } = await api.get('/tickets/admin', { params });
    return data;
  },

  async getTicket(id) {
    const { data } = await api.get(`/tickets/${id}`);
    return data;
  },

  async createTicket(ticketData) {
    const { data } = await api.post('/tickets', ticketData);
    return data;
  },

  async updateTicket(id, ticketData) {
    const { data } = await api.put(`/tickets/${id}`, ticketData);
    return data;
  },

  async deleteTicket(id) {
    const { data } = await api.delete(`/tickets/${id}`);
    return data;
  },

  async addTicketMessage(id, message) {
    const { data } = await api.post(`/tickets/${id}/messages`, { message });
    return data;
  },

  async assignTicket(id, assignData) {
    const { data } = await api.put(`/tickets/${id}/assign`, assignData);
    return data;
  },

  // ===== DELIVERY =====
  async getDeliveryCharges(params = {}) {
    const { data } = await api.get('/delivery', { params });
    return data;
  },

  async createDeliveryCharge(chargeData) {
    const { data } = await api.post('/delivery', chargeData);
    return data;
  },

  async updateDeliveryCharge(id, chargeData) {
    const { data } = await api.put(`/delivery/${id}`, chargeData);
    return data;
  },

  async deleteDeliveryCharge(id) {
    const { data } = await api.delete(`/delivery/${id}`);
    return data;
  },

  async bulkUploadDeliveryCharges(bulkData) {
    const { data } = await api.post('/delivery/bulk', bulkData);
    return data;
  },

  async getDefaultDeliverySettings() {
    const { data } = await api.get('/delivery/default-settings');
    return data;
  },

  async updateDefaultDeliverySettings(settings) {
    const { data } = await api.put('/delivery/default-settings', settings);
    return data;
  },

  // ===== RETURNS =====
  async getReturns() {
    const { data } = await api.get('/returns');
    return data;
  },

  async createReturn(returnData) {
    const { data } = await api.post('/returns', returnData);
    return data;
  },

  async updateReturnStatus(id, status, adminNotes) {
    const { data } = await api.put(`/returns/${id}/status`, { status, adminNotes });
    return data;
  },

  // ===== HOMEPAGE =====
  async getHomepageData() {
    const { data } = await api.get('/home');
    return data;
  },

  async updateHomepageData(homeData) {
    const { data } = await api.put('/home', homeData);
    return data;
  },

  async getDynamicHomeData() {
    const { data } = await api.get('/dynamic-home');
    return data;
  },

  async updateDynamicHomeData(dynamicData) {
    const { data } = await api.put('/dynamic-home', dynamicData);
    return data;
  },

  // ===== MENUS =====
  async getMenus() {
    const { data } = await api.get('/menus/admin');
    return data;
  },

  async createMenu(menuData) {
    const { data } = await api.post('/menus', menuData);
    return data;
  },

  async updateMenu(id, menuData) {
    const { data } = await api.put(`/menus/${id}`, menuData);
    return data;
  },

  async deleteMenu(id) {
    const { data } = await api.delete(`/menus/${id}`);
    return data;
  },

  // ===== SEARCH =====
  async getSearchSuggestions(query) {
    const { data } = await api.get('/search/suggestions', { params: { q: query } });
    return data;
  },

  // ===== ADDRESSES =====
  async getAddresses() {
    const { data } = await api.get('/user/addresses');
    return data;
  },

  async createAddress(addressData) {
    const { data } = await api.post('/user/addresses', addressData);
    return data;
  },

  async updateAddress(id, addressData) {
    const { data } = await api.put(`/user/addresses/${id}`, addressData);
    return data;
  },

  async deleteAddress(id) {
    const { data } = await api.delete(`/user/addresses/${id}`);
    return data;
  },

  async setDefaultAddress(id) {
    const { data } = await api.patch(`/user/addresses/${id}/default`);
    return data;
  },

  // ===== UPLOADS =====
  async uploadImage(file, folder = 'products') {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('folder', folder);
    const { data } = await api.post('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return data;
  },

  async uploadMultipleImages(files, folder = 'products') {
    const formData = new FormData();
    files.forEach(file => formData.append('images', file));
    formData.append('folder', folder);
    const { data } = await api.post('/upload/multiple', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return data;
  },
};

export default apiService;
