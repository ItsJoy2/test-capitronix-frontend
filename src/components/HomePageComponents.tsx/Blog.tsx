import React from 'react';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';

export default function Blog() {
  return (
      <section id="blog" className="py-20 bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Our Latest Blog
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Explore the newest blogs to guide your journey toward smarter
              investing.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Blog Post 1 */}
            <div className="bg-slate-800/50 rounded-2xl overflow-hidden backdrop-blur-sm border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300 group">
              <div className="aspect-video relative overflow-hidden">
                <img
                  src="/images/blog-hand-finance.png"
                  alt="Hand holding holographic financial elements"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold text-white group-hover:text-cyan-400 transition-colors">
                  Faucibus Nullam Quis Ante Eti Qrci Egetros ....
                </h3>
                <p className="text-white/70 leading-relaxed">
                  Maecenas tempus tellus eget condimentum rhoncus sem quam
                  semper.
                </p>
                <Button
                  variant="outline"
                  className="border-slate-600 text-white hover:bg-cyan-500 hover:border-cyan-500 group bg-transparent"
                >
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>

            {/* Blog Post 2 */}
            <div className="bg-slate-800/50 rounded-2xl overflow-hidden backdrop-blur-sm border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300 group">
              <div className="aspect-video relative overflow-hidden">
                <img
                  src="/images/blog-jar-coins.png"
                  alt="Glass jar filled with coins and financial charts"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold text-white group-hover:text-cyan-400 transition-colors">
                  Faucibus Nullam Quis Ante Eti Qrci Egetros ....
                </h3>
                <p className="text-white/70 leading-relaxed">
                  Maecenas tempus tellus eget condimentum rhoncus sem quam
                  semper.
                </p>
                <Button
                  variant="outline"
                  className="border-slate-600 text-white hover:bg-cyan-500 hover:border-cyan-500 group bg-transparent"
                >
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>

            {/* Blog Post 3 */}
            <div className="bg-slate-800/50 rounded-2xl overflow-hidden backdrop-blur-sm border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300 group">
              <div className="aspect-video relative overflow-hidden">
                <img
                  src="/images/blog-growth-plant.png"
                  alt="Financial growth chart with plant growing from coins"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold text-white group-hover:text-cyan-400 transition-colors">
                  Faucibus Nullam Quis Ante Eti Qrci Egetros ....
                </h3>
                <p className="text-white/70 leading-relaxed">
                  Maecenas tempus tellus eget condimentum rhoncus sem quam
                  semper.
                </p>
                <Button
                  variant="outline"
                  className="border-slate-600 text-white hover:bg-cyan-500 hover:border-cyan-500 group bg-transparent"
                >
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}