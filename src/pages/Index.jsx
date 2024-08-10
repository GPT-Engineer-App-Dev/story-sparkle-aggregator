import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink, Search, ArrowUp, ArrowDown, MessageSquare } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const fetchTopStories = async () => {
  const response = await fetch('https://hn.algolia.com/api/v1/search?tags=front_page&hitsPerPage=100');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const StoryCard = ({ story }) => (
  <Card className="mb-4 hover:border-orange-500 transition-colors duration-200">
    <CardContent className="p-4 flex">
      <div className="flex flex-col items-center mr-4">
        <Button variant="ghost" size="sm" className="px-2">
          <ArrowUp className="h-5 w-5 text-gray-500 hover:text-orange-500" />
        </Button>
        <span className="font-bold text-sm my-1">{story.points}</span>
        <Button variant="ghost" size="sm" className="px-2">
          <ArrowDown className="h-5 w-5 text-gray-500 hover:text-orange-500" />
        </Button>
      </div>
      <div className="flex-grow">
        <h2 className="text-lg font-semibold mb-2 hover:text-orange-500">
          <a href={story.url} target="_blank" rel="noopener noreferrer">{story.title}</a>
        </h2>
        <div className="text-sm text-gray-500 mb-2">
          <span>Posted by {story.author}</span>
          <span className="mx-2">•</span>
          <span>{formatDistanceToNow(new Date(story.created_at))} ago</span>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <Button variant="ghost" size="sm" className="px-2">
            <MessageSquare className="h-4 w-4 mr-1" />
            {story.num_comments} comments
          </Button>
          <Button variant="ghost" size="sm" className="px-2 ml-2" onClick={() => window.open(story.url, '_blank')}>
            <ExternalLink className="h-4 w-4 mr-1" />
            Open link
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
);

const SkeletonCard = () => (
  <Card className="mb-4">
    <CardContent className="p-4 flex">
      <div className="flex flex-col items-center mr-4">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-4 w-8 mt-2" />
        <Skeleton className="h-8 w-8 rounded-full mt-2" />
      </div>
      <div className="flex-grow">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2 mb-2" />
        <Skeleton className="h-4 w-1/4" />
      </div>
    </CardContent>
  </Card>
);

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data, isLoading, error } = useQuery({
    queryKey: ['topStories'],
    queryFn: fetchTopStories,
  });

  const filteredStories = data?.hits.filter(story =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-orange-500">Hacker News (Reddit Style)</h1>
        <div className="mb-6 flex bg-white rounded-md shadow">
          <Input
            type="text"
            placeholder="Search stories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="rounded-l-md border-none"
          />
          <Button variant="ghost" className="rounded-r-md">
            <Search className="h-4 w-4" />
          </Button>
        </div>
        {isLoading && (
          <div>
            {[...Array(5)].map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        )}
        {error && <p className="text-red-500">Error: {error.message}</p>}
        {!isLoading && !error && (
          <div>
            {filteredStories.map(story => (
              <StoryCard key={story.objectID} story={story} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;