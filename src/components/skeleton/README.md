# Skeleton Loading System

A modern, performant skeleton loading system built with Next.js 15, React 19, and TypeScript, following 2025 best practices.

## Features

- 🚀 **Next.js 13+ App Router Support** - Automatic loading.tsx files for all routes
- ⚡ **Performance Optimized** - Uses React.memo, CSS containment, and GPU acceleration
- 🎨 **Modern Animations** - Smooth shimmer effects with reduced motion support
- 📱 **Responsive Design** - Optimized for all screen sizes
- ♿ **Accessibility First** - Respects user preferences and screen readers
- 🌙 **Dark Mode Ready** - Seamless theme integration
- 🔧 **TypeScript** - Full type safety and IntelliSense support

## Components

### Core Components

#### `SkeletonBase`
The foundation component with customizable animations and styling.

```tsx
import { SkeletonBase } from "@/components/skeleton";

<SkeletonBase animate={true} className="custom-skeleton">
  Content
</SkeletonBase>
```

#### `SkeletonLine`
Perfect for text content and headings.

```tsx
import { SkeletonLine } from "@/components/skeleton";

<SkeletonLine width="80%" height="1.5rem" />
```

#### `SkeletonBox`
Ideal for images, cards, and rectangular content.

```tsx
import { SkeletonBox } from "@/components/skeleton";

<SkeletonBox width="100%" height="200px" borderRadius="0.5rem" />
```

#### `SkeletonCircle`
Great for avatars and profile images.

```tsx
import { SkeletonCircle } from "@/components/skeleton";

<SkeletonCircle size="80px" />
```

#### `SkeletonCard`
Complete card skeleton with image and text placeholders.

```tsx
import { SkeletonCard } from "@/components/skeleton";

<SkeletonCard />
```

### Page Skeletons

Pre-built skeletons for different page types:

- `HomePageSkeleton` - Home page layout
- `AboutPageSkeleton` - About page with avatar and content
- `WorkPageSkeleton` - Project showcase layout
- `BlogPageSkeleton` - Blog post listing
- `ContactPageSkeleton` - Contact form layout
- `GalleryPageSkeleton` - Image gallery layout

### Advanced Components

#### `LoadingWrapper`
Suspense boundary with custom fallbacks.

```tsx
import { LoadingWrapper } from "@/components/skeleton";

<LoadingWrapper fallback={<CustomSkeleton />}>
  <AsyncComponent />
</LoadingWrapper>
```

#### `TransitionProvider`
Global transition management with route-based loading.

```tsx
import { TransitionProvider } from "@/components/skeleton";

<TransitionProvider>
  <App />
</TransitionProvider>
```

#### `OptimizedSkeleton`
Performance-optimized skeleton with memoization.

```tsx
import { OptimizedSkeleton } from "@/components/skeleton";

<OptimizedSkeleton type="home" />
```

## Usage

### 1. Basic Implementation

The system is automatically integrated into your Next.js app through the layout. Each route has its own `loading.tsx` file:

```tsx
// src/app/about/loading.tsx
import { AboutPageSkeleton } from "@/components/skeleton";

export default function Loading() {
  return <AboutPageSkeleton />;
}
```

### 2. Custom Loading States

For custom loading states, use the loading wrappers:

```tsx
import { ProjectLoadingWrapper } from "@/components/skeleton";

<ProjectLoadingWrapper>
  <ProjectDetails />
</ProjectLoadingWrapper>
```

### 3. Performance Monitoring

Track loading performance in development:

```tsx
import { LoadingPerformanceMonitor } from "@/utils/loadingConfig";

const monitor = new LoadingPerformanceMonitor();
monitor.start();
// ... loading logic
monitor.end();
monitor.logMetrics(pathname);
```

## Configuration

### Loading Timeouts

Customize loading timeouts based on route complexity:

```tsx
import { getLoadingTimeout } from "@/utils/loadingConfig";

const timeout = getLoadingTimeout('/work', isMobile);
```

### Animation Settings

Respect user motion preferences:

```tsx
import { shouldRespectReducedMotion, getAnimationDuration } from "@/utils/loadingConfig";

const duration = getAnimationDuration();
```

## Best Practices

### 1. Performance
- Use `React.memo` for skeleton components
- Implement CSS containment for better rendering
- Leverage GPU acceleration with `transform: translateZ(0)`

### 2. Accessibility
- Always provide meaningful loading states
- Respect `prefers-reduced-motion`
- Use semantic HTML structure

### 3. User Experience
- Keep loading times under 300ms for perceived performance
- Use appropriate skeleton shapes that match content
- Provide smooth transitions between states

### 4. Development
- Use TypeScript for better developer experience
- Implement proper error boundaries
- Monitor performance metrics in development

## Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## Performance Metrics

The skeleton system is optimized for:

- **First Contentful Paint (FCP)**: < 1.5s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Cumulative Layout Shift (CLS)**: < 0.1
- **Time to Interactive (TTI)**: < 3.5s

## Contributing

When adding new skeleton components:

1. Follow the existing naming conventions
2. Include TypeScript types
3. Add responsive design considerations
4. Test with reduced motion preferences
5. Update this documentation

## License

MIT License - see LICENSE file for details.
