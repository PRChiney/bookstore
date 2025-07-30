import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import productsData from '../data/products.json';

const FICTION_CATEGORIES = [
  "Fantasy", "Science Fiction", "Mystery/Crime", "Horror", "Romance", "Historical Fiction", "Adventure", "Classic"
];
const NONFICTION_CATEGORIES = [
  "Biography/Autobiography", "Memoir", "History", "Science", "Self-Help", "Reference", "Textbooks", "Religious", "Travel", "Cookbooks"
];

const ALL_CATEGORIES = [...FICTION_CATEGORIES, ...NONFICTION_CATEGORIES];

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(productsData);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [categorySliderIndex, setCategorySliderIndex] = useState(0);
  const [categoriesPerView, setCategoriesPerView] = useState(6);
  const sectionRefs = useRef({});

  useEffect(() => {
    const updateCategoriesPerView = () => {
      const width = window.innerWidth;
      if (width >= 1400) {
        setCategoriesPerView(8);
      } else if (width >= 1200) {
        setCategoriesPerView(7);
      } else if (width >= 992) {
        setCategoriesPerView(6);
      } else if (width >= 768) {
        setCategoriesPerView(4);
      } else {
        setCategoriesPerView(2);
      }
    };

    updateCategoriesPerView();
    window.addEventListener('resize', updateCategoriesPerView);
    return () => window.removeEventListener('resize', updateCategoriesPerView);
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredProducts(productsData);
    } else {
      const results = productsData.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.author && product.author.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredProducts(results);
    }
  }, [searchTerm]);

  const groupByCategory = (categories) =>
    categories
      .map(cat => ({
        category: cat,
        books: filteredProducts.filter(b => b.category === cat)
      }))
      .filter(group => group.books.length > 0);

  const allGroups = groupByCategory(ALL_CATEGORIES);

  const handleCategoryClick = (category) => {
    if (sectionRefs.current[category]) {
      sectionRefs.current[category].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const canCategoryPrev = categorySliderIndex > 0;
  const canCategoryNext = categorySliderIndex + categoriesPerView < ALL_CATEGORIES.length;

  const visibleCategories = ALL_CATEGORIES.slice(
    categorySliderIndex,
    categorySliderIndex + categoriesPerView
  );

  const renderCategorySlider = () => (
  <div className="d-flex align-items-center gap-2 mb-4 justify-content-center">
    <button
      className="btn btn-outline-light"
      style={{ borderRadius: '50%', width: 40, height: 40, fontSize: 20 }}
      disabled={!canCategoryPrev}
      onClick={() => setCategorySliderIndex(idx => Math.max(idx - 1, 0))}
    >
      &lt;
    </button>
    <div
      className="d-flex gap-3 flex-nowrap justify-content-center"
      style={{ overflow: 'hidden', flexWrap: 'nowrap' }}
    >
      {visibleCategories.map((cat, index) => (
        <div
          key={cat}
          className="category-card d-flex align-items-center justify-content-center text-center"
          style={{
            minWidth: 'fit-content',
            maxWidth: '180px',
            height: 100,
            cursor: 'pointer',
            borderRadius: 12,
            background: '#23272b',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            border: '1px solid #343a40',
            color: '#f1f1f1',
            fontWeight: 600,
            fontSize: 15,
            padding: '0 16px',
            flexShrink: 0,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            transition: 'transform 0.2s',
            marginRight: index === visibleCategories.length - 1 ? '8px' : undefined,
          }}
          onClick={() => handleCategoryClick(cat)}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          {cat}
        </div>
      ))}
    </div>
    <button
      className="btn btn-outline-light"
      style={{ borderRadius: '50%', width: 40, height: 40, fontSize: 20 }}
      disabled={!canCategoryNext}
      onClick={() => setCategorySliderIndex(idx =>
        Math.min(idx + 1, ALL_CATEGORIES.length - categoriesPerView)
      )}
    >
      &gt;
    </button>
  </div>
);


  const renderBooksSection = (group) => {
    const showAll = expandedCategories[group.category];
    const booksToShow = showAll ? group.books : group.books.slice(0, 4);
    return (
      <div key={group.category} className="mb-5" ref={el => (sectionRefs.current[group.category] = el)}>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h4 className="text-secondary mb-0">{group.category}</h4>
          {group.books.length > 4 && (
            <button className="btn btn-sm btn-outline-primary" onClick={() => {
              setExpandedCategories(prev => ({
                ...prev,
                [group.category]: !prev[group.category],
              }));
            }}>
              {showAll ? 'View Less' : 'View More'}
            </button>
          )}
        </div>
        <div className="d-flex overflow-auto gap-3">
          {booksToShow.map(product => (
            <div style={{ minWidth: '250px' }} key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const showBookSections = !searchTerm || allGroups.length > 0;

  return (
    <div className="bg-homecustom min-vh-100">
      <Header />

      <div className="container my-4">

        {/* Category Horizontal Slider */}
        {renderCategorySlider()}

        {/* Search Bar */}
        <div className="input-group mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="🔍 Search books by title or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Book Sections */}
        {showBookSections && allGroups.map(renderBooksSection)}
      </div>
    </div>
  );
};

export default Home;
