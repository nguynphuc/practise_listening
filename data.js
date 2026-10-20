(function (root) {
  'use strict';
  const blank = (prompt, answer, trap, explanation, alternatives = []) => ({ prompt, answers: [answer, ...alternatives], trap, explanation });
  const note = (prompt, answer, concepts, allowedNegations = []) => ({ prompt, answer, concepts, allowedNegations });
  const exams = [
    {
      id: '01', title: 'People on the move', subtitle: 'Dân số & nhập cư', difficulty: 'Khởi động', pace: 'Chậm, rõ ý', voice: 'en-US-AriaNeural', rate: '-12%', topics: [1, 2],
      description: 'Làm quen với thông tin trực tiếp, con số và cách ghi ý chính.',
      parts: [
        { title: 'A town population project', topic: 'The Population',
          transcript: `Good morning. Today I will introduce our class population project. All the places and figures in this practice lecture are fictional. We are studying a town called Bellford. Please check the spelling: B E L L F O R D. Its first local population study took place in the nineteen eighties. Do not confuse that with the nineteen nineties, when the library opened. The current study includes fifteen thousand residents, not fifty thousand. Most participants live in the town centre. Our researchers describe the central neighbourhood as a high-density area. That compound adjective means many people live in a small space.
Our next interview session is on Monday. Interviews start at nine thirty in the morning, although staff should arrive at nine. Before the interviews, everyone must complete a short questionnaire. Some people call it a conversation, but questionnaire is the word printed on the form. The project uses the term birth rate for the number of births relative to the population. Finally, students will prepare a report about public transport. The report should explain how the town can help residents travel to work. Remember that these are practice figures, not statistics about a real town.`,
          questions: [
            blank('The town is called _____.', 'Bellford', 'Spelling', 'Bellford có hai chữ l; tên được đánh vần trong audio.'),
            blank('The first population study took place in the _____.', '1980s', 'Decades', 'Nineteen eighties = 1980s, không phải 1990s.', ['eighties', 'nineteen eighties']),
            blank('The current study includes _____ residents.', '15,000', 'Numbers', 'Fifteen thousand, không phải fifty thousand.', ['15000', 'fifteen thousand']),
            blank('Most participants live _____ the town centre.', 'in', 'in / on / at', 'In the town centre: trong khu trung tâm.'),
            blank('The central neighbourhood is a _____ area.', 'high-density', 'Compound adjectives', 'Tính từ ghép đứng trước area cần dấu gạch nối.'),
            blank('The next interview session is _____ Monday.', 'on', 'in / on / at', 'On + ngày trong tuần.'),
            blank('Interviews start _____ nine thirty.', 'at', 'in / on / at', 'At + giờ cụ thể.'),
            blank('Participants must complete a short _____.', 'questionnaire', 'Spelling', 'Questionnaire: chú ý hai chữ n.'),
            blank('The number of births relative to population is the _____.', 'birth rate', 'Key vocabulary', 'Birth rate là cụm hai từ.'),
            blank('The final report focuses on _____.', 'public transport', 'Key vocabulary', 'Audio yêu cầu báo cáo về giao thông công cộng.')
          ]
        },
        { title: 'Helping newcomers settle in', topic: 'Immigration',
          transcript: `Now let us turn to immigration. I will describe a fictional support programme in Bellford. People move to the town for several reasons. The first group comes to find work. The second group wants to join family members already living here. These are two different motivations, and the programme should respond to both.
New arrivals sometimes understand written English but find spoken instructions difficult. This language barrier makes it hard to use local services. The centre therefore offers free language classes. They take place in the evening so that people who work during the day can attend. Each newcomer can also meet a volunteer mentor. The mentor explains local services, such as how to register at a clinic.
The centre runs a job workshop as well. Participants practise interviews and prepare a curriculum vitae. Some newcomers cannot attend without help because they have young children. Free childcare allows these parents to take part in classes. At the weekend, a community meal brings long-term residents and newcomers together. Sharing food gives both groups a simple way to meet.
The programme is not designed to make people abandon their home language. Families are encouraged to keep using it because language helps preserve cultural identity. To find out whether the programme works, staff interview participants after three months. These follow-up interviews ask what has changed in daily life. Finally, the lecturer warns against treating all immigrants as one identical group. Their backgrounds and needs differ. Notes should preserve these differences instead of repeating a stereotype.`,
          questions: [
            note('Reasons for moving: note both motivations.', 'Find work and join family members.', [['work', 'jobs', 'employment'], ['family', 'relatives']]),
            note('Main barrier and its practical effect.', 'Spoken language difficulties make local services harder to use.', [['language', 'english', 'spoken instructions'], ['services', 'local service']]),
            note('Language classes: cost and timing.', 'Free classes in the evening.', [['free', 'no cost'], ['evening', 'after work']]),
            note('Mentors: who are they and what do they explain?', 'Volunteers explain local services.', [['volunteer', 'volunteers'], ['services', 'clinic', 'register']]),
            note('Job workshop: two activities.', 'Practise interviews and prepare a CV.', [['interview', 'interviews'], ['cv', 'curriculum vitae', 'resume', 'résumé']]),
            note('Childcare: who benefits and how?', 'Parents can attend classes.', [['parents', 'parent', 'families'], ['attend', 'classes', 'participate', 'take part']]),
            note('Community meal: which two groups meet?', 'Newcomers and long-term residents.', [['newcomers', 'immigrants', 'new arrivals'], ['residents', 'local people', 'locals']]),
            note('Home language: recommended action and reason.', 'Keep using it to preserve cultural identity.', [['keep', 'maintain', 'preserve', 'continue'], ['identity', 'culture', 'cultural']]),
            note('Evaluation: method and timing.', 'Follow-up interviews after three months.', [['interviews', 'interview'], ['three months', '3 months']]),
            note('Why should notes avoid stereotypes?', 'Immigrants have different backgrounds and needs.', [['different', 'differ', 'diverse', 'varied'], ['needs', 'backgrounds', 'background']])
          ]
        }
      ]
    },
    {
      id: '02', title: 'Work, home & balance', subtitle: 'Công việc & gia đình', difficulty: 'Phát triển', pace: 'Vừa, có sửa thông tin', voice: 'en-US-GuyNeural', rate: '-5%', topics: [3, 4],
      description: 'Theo dõi thông tin được sửa lại và phân biệt các ý gần nhau.',
      parts: [
        { title: 'A changing workplace', topic: 'Work in America',
          transcript: `Welcome to our seminar on work in America. We will use a fictional company called Northbridge to explore changes in working life. The archive begins in the nineteen seventies. The nineteen eighties are relevant to another company, so do not put that decade in your notes for Northbridge. At first, I thought the survey covered sixty employees. Let me correct that: it covered sixteen employees.
The participants all worked part-time. Here part-time describes their employment, rather than their level of commitment. The researcher first contacted them in September. The main interview day was on Friday, and the briefing began at eight fifteen. Eight fifty was the time of a different meeting.
Participants said flexible hours helped them manage family responsibilities. They also asked for better equipment. In particular, the interviewer used the word accommodation when discussing changes for individual needs. Accommodation is often misspelled, so remember that it contains a double c and a double m. The company offered a six-week training course. Six-week is the adjective before course; we do not say six-weeks course.
The final recommendation was job security. Higher pay was discussed, but the final written recommendation focused on job security because workers wanted to know whether their employment would continue. These details belong to a fictional case and should not be used as national employment statistics.`,
          questions: [
            blank('The company archive begins in the _____.', '1970s', 'Decades', '1970s mới thuộc Northbridge.', ['seventies', 'nineteen seventies']),
            blank('The corrected survey size is _____ employees.', '16', 'Numbers', 'Người nói sửa sixty thành sixteen.', ['sixteen']),
            blank('The participants had _____ employment.', 'part-time', 'Compound adjectives', 'Part-time đứng trước danh từ employment.'),
            blank('The researcher first contacted workers _____ September.', 'in', 'in / on / at', 'In + tháng.'),
            blank('The main interviews were _____ Friday.', 'on', 'in / on / at', 'On + thứ.'),
            blank('The briefing began _____ eight fifteen.', 'at', 'in / on / at', 'At + thời gian cụ thể.'),
            blank('Workers valued _____ to manage family responsibilities.', 'flexible hours', 'Key vocabulary', 'Flexible hours giúp thu xếp việc gia đình.'),
            blank('Changes for individual needs were called _____.', 'accommodation', 'Spelling', 'Accommodation có cc và mm.'),
            blank('The company offered a _____ training course.', 'six-week', 'Compound adjectives', 'Số + danh từ số ít khi làm tính từ ghép.', ['6-week']),
            blank('The final recommendation focused on _____.', 'job security', 'Distractor', 'Higher pay được nhắc đến nhưng không phải kiến nghị cuối.')
          ]
        },
        { title: 'Family life beyond one model', topic: 'Family in the United States',
          transcript: `In this lecture, I want to question the idea that there is only one family model. Our fictional interview study includes single-parent families and multigenerational households. These categories are examples, not a complete list. We collected information through interviews rather than questionnaires because we wanted detailed personal accounts.
Several parents described childcare costs as a reason for reducing their working hours. This does not mean they lacked interest in their careers. Grandparents sometimes provided childcare, allowing parents to continue working. However, the direction of support could change. Adult children also helped older relatives with daily tasks.
Distance changed how some families stayed connected. Relatives who lived far apart used video calls to maintain contact. Technology helped communication, but it did not replace every form of practical support. In another part of the study, shared household chores reduced pressure on one person. Participants emphasised that sharing tasks fairly mattered more than giving every person exactly the same task.
The researchers also asked about major decisions. Several families preferred discussing important choices together instead of leaving them to one person. Work schedules still created problems. Unpredictable shifts made it difficult to plan shared meals, even when relatives wanted to eat together. Employers could help by giving advance notice of schedules. That notice allowed families to plan childcare and time together.
We should be careful about generalising. The sample came from only one town, so it cannot represent every family in the country. The main conclusion is that families organise support in different ways. When evaluating family well-being, researchers should consider the quality of support rather than assume that one household structure is always best.`,
          questions: [
            note('Two household types included in the study.', 'Single-parent and multigenerational families.', [['single-parent', 'single parent'], ['multigenerational', 'multi-generational', 'multiple generations']]),
            note('Research method and reason for choosing it.', 'Interviews to obtain detailed personal accounts.', [['interviews', 'interview'], ['detailed', 'detail', 'personal accounts', 'depth']]),
            note('Childcare costs: effect on parents’ work.', 'High childcare costs led parents to reduce working hours.', [['childcare', 'child care'], ['reduce', 'reduced', 'fewer hours', 'cut hours', 'less work']]),
            note('Grandparents: support provided and effect.', 'Provide childcare so parents can keep working.', [['childcare', 'child care', 'look after children'], ['work', 'working', 'employment']]),
            note('Distant relatives: communication method and purpose.', 'Video calls maintain contact.', [['video calls', 'video call', 'online calls'], ['contact', 'connected', 'connection', 'communicate']]),
            note('Household chores: arrangement and benefit.', 'Share chores to reduce pressure on one person.', [['share', 'shared', 'sharing'], ['pressure', 'stress', 'burden']]),
            note('Major decisions: preferred approach.', 'Discuss important choices together.', [['discuss', 'discussion', 'talk'], ['together', 'jointly', 'everyone', 'whole family']]),
            note('Work schedules: problem and effect on family routines.', 'Unpredictable shifts make shared meals difficult to plan.', [['unpredictable', 'irregular', 'changing shifts'], ['meals', 'meal', 'eat together']]),
            note('Employers: helpful change and what it enables.', 'Advance notice of schedules helps families plan.', [['advance', 'early notice', 'earlier'], ['plan', 'planning', 'organise', 'organize']]),
            note('Study limitation: sample location and implication.', 'One town cannot represent all families.', [['one town', 'single town', 'one location'], ['represent', 'generalise', 'generalize', 'limited']], ['cannot represent', 'not representative', 'cannot generalise', 'cannot generalize'])
          ]
        }
      ]
    },
    {
      id: '03', title: 'Beliefs & life passages', subtitle: 'Tôn giáo & các dấu mốc cuộc đời', difficulty: 'Thử thách', pace: 'Tự nhiên, nhiều đối chiếu', voice: 'en-GB-SoniaNeural', rate: '+0%', topics: [5, 6],
      description: 'Phân biệt thời gian, nghe đối chiếu và ghi lại quan hệ nguyên nhân–kết quả.',
      parts: [
        { title: 'Studying religious diversity', topic: 'Religion',
          transcript: `Today we are considering how a community centre can study religious diversity respectfully. I am using an invented centre, Westhaven, and all the numbers refer only to this exercise. Although its building dates from the nineteen sixties, the interfaith project began in the nineteen nineties. The distinction matters: the question concerns the project, not the building.
An early draft mentioned thirteen discussion groups. The organiser later confirmed thirty, so use the revised number. Meetings were held in April, on the second Tuesday of the month. Visitors arrived at noon. Some came at twelve thirty for lunch, but that was after the discussion had begun.
The centre described its approach as community-based research. Instead of imposing a set of labels, researchers listened to how participants described themselves. They collected information through an anonymous questionnaire. Anonymous means that names are not attached to responses. The lecturer contrasted religious freedom with the assumption that everyone must have a religion. Freedom includes a person's choice about whether to follow a religion.
During discussions, participants were encouraged to challenge a stereotype rather than make a judgement from a single example. Finally, organisers announced a follow-up meeting to review what the first discussions had missed. This was a follow-up meeting, not a new survey. Remember that the project aims to understand differences respectfully; it does not rank beliefs or decide which community is more important.`,
          questions: [
            blank('The interfaith project began in the _____.', '1990s', 'Decades', '1960s nói về tòa nhà; 1990s nói về dự án.', ['nineties', 'nineteen nineties']),
            blank('The confirmed number of discussion groups was _____.', '30', 'Numbers', 'Thông tin sau cùng là thirty, thay cho thirteen.', ['thirty']),
            blank('Meetings were held _____ April.', 'in', 'in / on / at', 'In + tháng.'),
            blank('Meetings took place _____ the second Tuesday.', 'on', 'in / on / at', 'On + ngày cụ thể.'),
            blank('Visitors arrived _____ noon for the discussion.', 'at', 'in / on / at', 'At noon; không nhầm với giờ ăn trưa.'),
            blank('The approach was described as _____ research.', 'community-based', 'Compound adjectives', 'Community-based là tính từ ghép trước research.'),
            blank('Researchers used an anonymous _____.', 'questionnaire', 'Spelling', 'Questionnaire, không phải questionaire.'),
            blank('The key principle discussed was _____.', 'religious freedom', 'Key vocabulary', 'Religious freedom gồm cả quyền lựa chọn có theo tôn giáo hay không.'),
            blank('Participants were encouraged to challenge a _____.', 'stereotype', 'Spelling', 'Stereotype: nhận định khuôn mẫu.'),
            blank('Organisers announced a _____ meeting.', 'follow-up', 'Compound adjectives', 'Follow-up meeting, không phải một khảo sát mới.')
          ]
        },
        { title: 'How communities mark life transitions', topic: 'Birth, Marriage, and Death',
          transcript: `Life transitions often involve both personal choices and community expectations. For today's lecture, we interviewed fictional families about birth, marriage, and death. The aim is to compare how people mark change without assuming that everyone follows the same tradition.
After a birth, some families hold a naming ceremony. It introduces the child to the wider community. Relatives may also deliver meals, providing practical support to new parents at a demanding time. These two actions have different functions: one marks belonging, while the other reduces daily work.
Marriage can involve a civil registration as well as a religious ceremony. The former establishes legal recognition; the latter may express a couple's beliefs. They should not be treated as interchangeable. In the interviews, some couples chose smaller weddings because they wanted to avoid debt. Others combined traditions from both partners' backgrounds. Their decisions reflected negotiation between families rather than a single fixed rule.
After a death, memorial gatherings gave participants a chance to share memories. Friends also supported bereaved relatives by helping with everyday tasks. Support could continue after the formal ceremony, when visitors had gone home and routines still felt difficult.
Across all three transitions, younger and older relatives sometimes disagreed about expectations. Open conversation helped them reach a compromise. A respectful researcher should therefore ask participants what a custom means to them, rather than infer its meaning from appearance alone. Finally, the lecturer identifies a limitation of the interviews: people described what they remembered, so the accounts may omit details. Notes should distinguish participants' memories from direct observation. This is a study of reported experience, not a record of every event as it happened.`,
          questions: [
            note('Naming ceremony: who is introduced, and to whom?', 'The child is introduced to the community.', [['child', 'baby', 'newborn'], ['community', 'wider group']]),
            note('Meals after a birth: type of help and beneficiaries.', 'Practical support for new parents.', [['practical', 'meals', 'food', 'daily work'], ['parents', 'parent']]),
            note('Civil registration: type of recognition.', 'Civil registration establishes legal recognition.', [['civil', 'registration'], ['legal', 'law']]),
            note('Religious ceremony: what does it express?', 'A religious ceremony can express the couple’s beliefs.', [['religious', 'religion'], ['beliefs', 'faith', 'belief']]),
            note('Smaller weddings: choice and financial reason.', 'Choose smaller weddings to avoid debt.', [['smaller', 'small', 'reduce size'], ['debt', 'borrowing', 'loans']]),
            note('Mixed-background couples: how are traditions selected?', 'Combine traditions from both partners’ backgrounds.', [['combine', 'blend', 'mix', 'combined'], ['both', 'two backgrounds', 'each partner']]),
            note('Memorial gatherings: activity and context.', 'Share memories after a death.', [['memories', 'remember', 'remembrance'], ['death', 'died', 'deceased', 'bereavement']]),
            note('Support after a death: practical action and duration.', 'Help with everyday tasks beyond the ceremony.', [['tasks', 'chores', 'daily work', 'everyday'], ['after', 'continue', 'beyond', 'ongoing']]),
            note('Generational disagreement: response and outcome.', 'Open conversation helps relatives reach compromise.', [['conversation', 'discuss', 'discussion', 'talk'], ['compromise', 'agreement', 'agree']]),
            note('Interview limitation: source of accounts and possible weakness.', 'Accounts rely on memory and may omit details.', [['memory', 'memories', 'remembered', 'recall'], ['omit', 'missing', 'incomplete', 'forget', 'forgotten']])
          ]
        }
      ]
    },
    {
      id: '04', title: 'Living together, staying safe', subtitle: 'Đa văn hóa & hai góc nhìn về tội phạm', difficulty: 'Mô phỏng giữa kỳ', pace: 'Nhanh hơn, ý gián tiếp', voice: 'en-US-AndrewNeural', rate: '+7%', topics: [7, 8],
      description: 'Nghe thông tin dày hơn, sửa số liệu và tổng hợp các góc nhìn đối lập.',
      parts: [
        { title: 'Building a multicultural neighbourhood', topic: 'Multiculturalism',
          transcript: `Our final case concerns a fictional neighbourhood initiative in Eastmere. Before we discuss the results, let me clear up two details in the handout. The cultural programme started in the two thousands, not the nineteen nineties. The earlier decade refers to the construction of the community hall. Also, the final attendance figure was one thousand four hundred and fifty. A preliminary estimate of one thousand five hundred and forty was withdrawn.
The programme opened in July, with the main celebration on Saturday. The registration desk closed at half past ten, even though performances continued until noon. Organisers called it a well-established festival by its fifth year. That description refers to its reputation, not the age of every activity.
A committee member used the term cultural diversity to describe the range of backgrounds represented. Yet simply placing people in the same room did not automatically produce meaningful contact. To create that contact, each discussion table used a bilingual facilitator. Facilitators could explain instructions in two languages, but they were not expected to speak for an entire community.
The local university provided accommodation for visiting performers. In the feedback session, residents asked for a long-term partnership rather than a one-off celebration. The committee accepted that recommendation and planned regular activities. Take care when recording this: the lecture contrasts an isolated event with a continuing relationship, and the final recommendation concerns the continuing relationship.`,
          questions: [
            blank('The cultural programme started in the _____.', '2000s', 'Decades', 'The two thousands = 2000s; 1990s là thời điểm xây hội trường.', ['two thousands', 'noughties']),
            blank('The final attendance figure was _____.', '1,450', 'Numbers', '1,450 là số cuối cùng; 1,540 đã bị rút lại.', ['1450']),
            blank('The programme opened _____ July.', 'in', 'in / on / at', 'In + tháng.'),
            blank('The main celebration was _____ Saturday.', 'on', 'in / on / at', 'On + ngày.'),
            blank('Registration closed _____ half past ten.', 'at', 'in / on / at', 'At + giờ; noon là lúc kết thúc biểu diễn.'),
            blank('By its fifth year it was a _____ festival.', 'well-established', 'Compound adjectives', 'Well-established là tính từ ghép trước festival.'),
            blank('The range of backgrounds was called _____.', 'cultural diversity', 'Key vocabulary', 'Cultural diversity: sự đa dạng văn hóa.'),
            blank('Each table used a _____ facilitator.', 'bilingual', 'Spelling', 'Bilingual: sử dụng được hai ngôn ngữ.'),
            blank('The university provided _____ for performers.', 'accommodation', 'Spelling', 'Accommodation có hai c và hai m.'),
            blank('The final request was for a _____ partnership.', 'long-term', 'Compound adjectives', 'Long-term partnership đối lập với sự kiện one-off.')
          ]
        },
        { title: 'Two approaches to reducing crime', topic: 'Two Views on Crime',
          transcript: `Today I will compare two approaches to reducing crime, using a fictional council discussion. The first speaker favours deterrence. In her view, a credible risk of punishment can discourage offending. She argues that enforcement should be consistent, so that people expect rules to be applied predictably. She does not claim that increasing every sentence automatically solves the problem.
The second speaker concentrates on prevention. He proposes youth activities and employment support to address conditions that can increase the risk of offending. His argument is that opportunity matters, although he does not excuse harm to victims. Both speakers agree that victims should have access to support services. This agreement is easy to miss if we focus only on their disagreement about punishment.
The council then considers evidence from a local pilot. Recorded incidents fell during the pilot, but there was no comparison area. We therefore cannot confidently attribute the fall to the programme. Another complication is reporting behaviour. If residents become more willing to contact the police, recorded crime may rise even when actual offending does not. Recorded figures and actual events are related, but they are not identical.
To improve trust, the council proposes regular meetings between residents and local officers. These meetings are intended to improve communication. A separate rehabilitation scheme offers education to people leaving prison, aiming to reduce reoffending. The council must also consider its limited budget, which requires trade-offs between immediate enforcement and longer-term prevention.
The lecturer's conclusion is cautious. Rather than declaring one approach universally superior, the council should combine appropriate measures and evaluate their outcomes. Good notes should preserve both the shared goal of reducing harm and the differences between the proposed methods. A falling number alone is not enough to tell us why change occurred.`,
          questions: [
            note('Deterrence: mechanism and intended effect.', 'Risk of punishment discourages offending.', [['punishment', 'penalty', 'penalties', 'sanctions'], ['discourage', 'discourages', 'deter', 'deters', 'reduce offending', 'prevent crime']]),
            note('Enforcement: desired quality and why it matters.', 'Consistent enforcement makes rules predictable.', [['consistent', 'consistency', 'uniform'], ['predictable', 'predictability', 'expect rules', 'certainty']]),
            note('Prevention: two practical proposals.', 'Youth activities and employment support.', [['youth activities', 'youth programmes', 'youth programs', 'activities for young'], ['employment', 'jobs', 'job support', 'work opportunities']]),
            note('Common ground between both speakers.', 'Victims should have access to support services.', [['victims', 'victim'], ['support', 'services', 'assistance', 'help']]),
            note('Pilot study: missing evidence and consequence.', 'No comparison area means causation is uncertain.', [['comparison', 'control group', 'control area'], ['uncertain', 'causation', 'attribute', 'causal', 'cannot prove']], ['no comparison area', 'no comparison', 'no control group', 'no control area', 'cannot prove', 'cannot confidently attribute']),
            note('Reporting behaviour: change and statistical effect.', 'More reporting can increase recorded crime.', [['more reporting', 'report more', 'reporting increases', 'willing to report', 'willing to contact'], ['increase', 'rise', 'higher', 'go up']]),
            note('Trust-building: proposed activity and purpose.', 'Resident–officer meetings improve communication.', [['meetings', 'meeting'], ['communication', 'communicate', 'dialogue', 'trust']]),
            note('Rehabilitation: method and goal.', 'Education for prison leavers aims to reduce reoffending.', [['education', 'learning', 'training'], ['reoffending', 'recidivism', 'repeat crime', 'offend again']]),
            note('Budget: constraint and resulting decision.', 'Limited funds require trade-offs between approaches.', [['limited', 'scarce', 'constraint', 'restricted'], ['trade-offs', 'trade offs', 'priorities', 'balance', 'choose', 'choices']]),
            note('Final recommendation: strategy and follow-up.', 'Combine appropriate measures and evaluate outcomes.', [['combine', 'combined', 'mix', 'both approaches'], ['evaluate', 'evaluation', 'assess', 'monitor', 'review outcomes']])
          ]
        }
      ]
    }
  ];
  root.EXAMS = exams;
  root.TOPICS = ['The Population', 'Immigration', 'Work in America', 'Family in the United States', 'Religion', 'Birth, Marriage, and Death', 'Multiculturalism', 'Two Views on Crime'];
  if (typeof module !== 'undefined') module.exports = exams;
})(typeof window === 'undefined' ? globalThis : window);
