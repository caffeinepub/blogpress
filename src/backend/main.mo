import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Order "mo:core/Order";
import Array "mo:core/Array";
import Map "mo:core/Map";

actor {
  // Types
  type BlogPost = {
    id : Text;
    title : Text;
    excerpt : Text;
    content : Text;
    category : Text;
    author : Text;
    authorAvatar : Text;
    date : Time.Time;
    imageUrl : Text;
    tags : [Text];
    viewCount : Nat;
    commentCount : Nat;
  };

  type Category = {
    id : Text;
    name : Text;
    postCount : Nat;
  };

  module Category {
    public func compare(cat1 : Category, cat2 : Category) : Order.Order {
      Text.compare(cat1.name, cat2.name);
    };
  };

  module BlogPost {
    public func compare(post1 : BlogPost, post2 : BlogPost) : Order.Order {
      Text.compare(post1.title, post2.title);
    };

    public func compareByDateAsc(post1 : BlogPost, post2 : BlogPost) : Order.Order {
      Int.compare(post1.date, post2.date);
    };

    public func compareByDateDesc(post1 : BlogPost, post2 : BlogPost) : Order.Order {
      Int.compare(post2.date, post1.date);
    };

    public func compareByViews(post1 : BlogPost, post2 : BlogPost) : Order.Order {
      Nat.compare(post2.viewCount, post1.viewCount);
    };
  };

  // State
  let posts = Map.empty<Text, BlogPost>();
  let categories = Map.empty<Text, Category>();
  let tagsCache = Map.empty<Text, Nat>();

  public shared ({ caller }) func getPosts(page : Nat, pageSize : Nat, category : ?Text, search : ?Text, sortBy : Text) : async {
    posts : [BlogPost];
    total : Nat;
  } {
    var filteredPosts = posts.values().toArray();

    // Category filter
    switch (category) {
      case (?cat) {
        filteredPosts := filteredPosts.filter(func(p) { p.category == cat });
      };
      case (null) {};
    };

    // Search filter
    switch (search) {
      case (?s) {
        let searchLower = s.toLower();
        filteredPosts := filteredPosts.filter(
          func(p) {
            p.title.toLower().contains(#text searchLower) or p.excerpt.toLower().contains(#text searchLower)
          }
        );
      };
      case (null) {};
    };

    // Sorting
    let sortedPosts = switch (sortBy) {
      case ("date_asc") { filteredPosts.sort(BlogPost.compareByDateAsc) };
      case ("views") { filteredPosts.sort(BlogPost.compareByViews) };
      case (_) { filteredPosts.sort(BlogPost.compareByDateDesc) };
    };

    // Pagination
    let start = page * pageSize;
    let end = if (start + pageSize > sortedPosts.size()) { sortedPosts.size() } else {
      start + pageSize
    };
    let pagePosts = if (start < sortedPosts.size()) {
      Array.tabulate(
        if (end - start > sortedPosts.size()) {
          sortedPosts.size() - start;
        } else {
          end - start;
        },
        func(i) { sortedPosts[i + start] },
      );
    } else { [] };

    {
      posts = pagePosts;
      total = filteredPosts.size();
    };
  };

  public query ({ caller }) func getPost(id : Text) : async BlogPost {
    switch (posts.get(id)) {
      case (?post) { post };
      case (null) { Runtime.trap("Post not found") };
    };
  };

  public query ({ caller }) func getCategories() : async [Category] {
    categories.values().toArray().sort();
  };

  public query ({ caller }) func getTags() : async [Text] {
    tagsCache.keys().toArray();
  };

  public query ({ caller }) func getRecentPosts(limit : Nat) : async [BlogPost] {
    let allPosts = posts.values().toArray();
    let sorted = allPosts.sort(BlogPost.compareByDateDesc);
    Array.tabulate(if (limit > sorted.size()) { sorted.size() } else { limit }, func(i) { sorted[i] });
  };

  public query ({ caller }) func searchSuggestions(searchQuery : Text) : async [Text] {
    let queryLower = searchQuery.toLower();
    let suggestions = posts.values().toArray().filter(
      func(p) {
        p.title.toLower().contains(#text queryLower)
      }
    );
    Array.tabulate(
      if (suggestions.size() < 5) { suggestions.size() } else { 5 },
      func(i) { suggestions[i].title },
    );
  };

  // Seed data
  system func preupgrade() {};
  system func postupgrade() {
    let initialPosts : [BlogPost] = [
      {
        id = "1";
        title = "Understanding AI: A Beginner's Guide";
        excerpt = "Explore the basics of artificial intelligence and its real-world applications.";
        content = "Full content goes here...";
        category = "AI";
        author = "Alice";
        authorAvatar = "https://randomuser.me/api/portraits/women/1.jpg";
        date = 1701302400;
        imageUrl = "https://picsum.photos/200/300";
        tags = ["AI", "technology", "machine learning"];
        viewCount = 320;
        commentCount = 12;
      },
      {
        id = "2";
        title = "Top 10 Programming Languages in 2024";
        excerpt = "Discover the most popular programming languages this year.";
        content = "Full content goes here...";
        category = "Programming";
        author = "Bob";
        authorAvatar = "https://randomuser.me/api/portraits/men/2.jpg";
        date = 1701144000;
        imageUrl = "https://picsum.photos/200/301";
        tags = ["programming", "tutorial", "reviews"];
        viewCount = 412;
        commentCount = 18;
      },
      {
        id = "3";
        title = "How AI is Revolutionizing Healthcare";
        excerpt = "Learn how artificial intelligence is transforming medical practices.";
        content = "Full content goes here...";
        category = "AI";
        author = "Catherine";
        authorAvatar = "https://randomuser.me/api/portraits/women/3.jpg";
        date = 1700985600;
        imageUrl = "https://picsum.photos/200/302";
        tags = ["AI", "healthcare", "technology"];
        viewCount = 155;
        commentCount = 9;
      },
      {
        id = "4";
        title = "The Rise of Quantum Computing";
        excerpt = "An introduction to quantum computing and its potential impact.";
        content = "Full content goes here...";
        category = "Technology";
        author = "David";
        authorAvatar = "https://randomuser.me/api/portraits/men/4.jpg";
        date = 1700827200;
        imageUrl = "https://picsum.photos/200/303";
        tags = ["quantum", "computing", "technology"];
        viewCount = 210;
        commentCount = 7;
      },
      {
        id = "5";
        title = "Getting Started with Rust Programming";
        excerpt = "A beginner's guide to Rust programming language.";
        content = "Full content goes here...";
        category = "Programming";
        author = "Eva";
        authorAvatar = "https://randomuser.me/api/portraits/women/5.jpg";
        date = 1700668800;
        imageUrl = "https://picsum.photos/200/304";
        tags = ["rust", "programming", "tutorial"];
        viewCount = 128;
        commentCount = 4;
      },
      {
        id = "6";
        title = "The Future of AI in Education";
        excerpt = "How artificial intelligence is shaping the future of education.";
        content = "Full content goes here...";
        category = "AI";
        author = "Frank";
        authorAvatar = "https://randomuser.me/api/portraits/men/6.jpg";
        date = 1700510400;
        imageUrl = "https://picsum.photos/200/305";
        tags = ["AI", "education", "technology"];
        viewCount = 98;
        commentCount = 3;
      },
      {
        id = "7";
        title = "Best Laptops for Developers in 2024";
        excerpt = "A review of the top laptops for programming and development.";
        content = "Full content goes here...";
        category = "Reviews";
        author = "Grace";
        authorAvatar = "https://randomuser.me/api/portraits/women/7.jpg";
        date = 1700352000;
        imageUrl = "https://picsum.photos/200/306";
        tags = ["reviews", "technology", "programming"];
        viewCount = 250;
        commentCount = 11;
      },
      {
        id = "8";
        title = "Introduction to Blockchain Technology";
        excerpt = "Understanding the basics of blockchain and its applications.";
        content = "Full content goes here...";
        category = "Technology";
        author = "Henry";
        authorAvatar = "https://randomuser.me/api/portraits/men/8.jpg";
        date = 1700193600;
        imageUrl = "https://picsum.photos/200/307";
        tags = ["blockchain", "technology", "tutorial"];
        viewCount = 176;
        commentCount = 6;
      },
      {
        id = "9";
        title = "A Guide to Functional Programming";
        excerpt = "Learn the fundamentals of functional programming concepts.";
        content = "Full content goes here...";
        category = "Programming";
        author = "Irene";
        authorAvatar = "https://randomuser.me/api/portraits/women/9.jpg";
        date = 1700035200;
        imageUrl = "https://picsum.photos/200/308";
        tags = ["functional programming", "tutorial"];
        viewCount = 83;
        commentCount = 2;
      },
      {
        id = "10";
        title = "The Impact of AI on Job Market";
        excerpt = "Analyzing how artificial intelligence is changing the job landscape.";
        content = "Full content goes here...";
        category = "AI";
        author = "Jake";
        authorAvatar = "https://randomuser.me/api/portraits/men/10.jpg";
        date = 1699876800;
        imageUrl = "https://picsum.photos/200/309";
        tags = ["AI", "jobs", "technology"];
        viewCount = 148;
        commentCount = 5;
      },
      {
        id = "11";
        title = "Step-by-Step Guide to Web Development";
        excerpt = "A comprehensive tutorial for aspiring web developers.";
        content = "Full content goes here...";
        category = "Tutorials";
        author = "Karen";
        authorAvatar = "https://randomuser.me/api/portraits/women/11.jpg";
        date = 1699718400;
        imageUrl = "https://picsum.photos/200/310";
        tags = ["web development", "tutorial"];
        viewCount = 201;
        commentCount = 8;
      },
      {
        id = "12";
        title = "Exploring Deep Learning Techniques";
        excerpt = "Dive into the world of deep learning with practical examples.";
        content = "Full content goes here...";
        category = "AI";
        author = "Liam";
        authorAvatar = "https://randomuser.me/api/portraits/men/12.jpg";
        date = 1699560000;
        imageUrl = "https://picsum.photos/200/311";
        tags = ["AI", "deep learning", "machine learning"];
        viewCount = 135;
        commentCount = 4;
      },
    ];

    for (post in initialPosts.values()) {
      posts.add(post.id, post);
      // Category count update
      switch (categories.get(post.category)) {
        case (?cat) {
          categories.add(post.category, { cat with postCount = cat.postCount + 1 });
        };
        case (null) {
          categories.add(post.category, {
            id = post.category;
            name = post.category;
            postCount = 1;
          });
        };
      };

      // Tags cache update
      for (tag in post.tags.values()) {
        switch (tagsCache.get(tag)) {
          case (?count) { tagsCache.add(tag, count + 1) };
          case (null) { tagsCache.add(tag, 1) };
        };
      };
    };
  };
};
